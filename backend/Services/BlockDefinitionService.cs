using DtcBackend.Configurations;
using DtcBackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DtcBackend.Services;

public class BlockDefinitionService
{
    private readonly IMongoCollection<BlockDefinition> _blocks;

    public BlockDefinitionService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _blocks = database.GetCollection<BlockDefinition>("block_definitions");
    }

    public async Task<List<BlockDefinition>> GetAllAsync() =>
        await _blocks.Find(_ => true).ToListAsync();

    public async Task<BlockDefinition?> GetByIdAsync(string id) =>
        await _blocks.Find(b => b.id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(BlockDefinition block)
    {
        block.createdAt = DateTime.UtcNow;
        block.updatedAt = DateTime.UtcNow;

        if (block.location == "header" || block.location == "footer")
            block.unique = true;

        await _blocks.InsertOneAsync(block);
    }

    public async Task UpdateAsync(string id, BlockDefinition block)
    {
        block.updatedAt = DateTime.UtcNow;

        if (block.location == "header" || block.location == "footer")
            block.unique = true;

        await _blocks.ReplaceOneAsync(b => b.id == id, block);
    }

    public async Task UpsertByNameAsync(string name, BlockDefinition updatedData)
    {
        updatedData.updatedAt = DateTime.UtcNow;

        if (updatedData.location == "header" || updatedData.location == "footer")
            updatedData.unique = true;

        var filter = Builders<BlockDefinition>.Filter.Eq(b => b.name, name);
        var options = new ReplaceOptions { IsUpsert = true };

        await _blocks.ReplaceOneAsync(filter, updatedData, options);
    }

    public async Task DeleteAsync(string id) =>
        await _blocks.DeleteOneAsync(b => b.id == id);
}
