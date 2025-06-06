using DtcBackend.Configurations;
using DtcBackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DtcBackend.Services;

public class GlobalService
{
    private readonly IMongoCollection<Globals> _globals;

    public GlobalService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _globals = database.GetCollection<Globals>("globals");
    }

    public async Task<List<Globals>> GetAllAsync() =>
        await _globals.Find(_ => true).ToListAsync();

    public async Task<Globals?> GetByIdAsync(string id) =>
        await _globals.Find(g => g.id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Globals global)
    {
        global.createdAt = DateTime.UtcNow;
        global.updatedAt = DateTime.UtcNow;
        await _globals.InsertOneAsync(global);
    }

    public async Task UpdateAsync(string id, Globals updated)
    {
        updated.updatedAt = DateTime.UtcNow;
        await _globals.ReplaceOneAsync(g => g.id == id, updated);
    }

    public async Task DeleteAsync(string id) =>
        await _globals.DeleteOneAsync(g => g.id == id);

    public async Task UpdateDataAsync(string id, Dictionary<string, object> data)
    {
        var update = Builders<Globals>.Update
            .Set(g => g.data, data)
            .Set(g => g.updatedAt, DateTime.UtcNow);

        await _globals.UpdateOneAsync(g => g.id == id, update);
    }

    public async Task UpdateSettingsAsync(string id, BlockSettings settings)
    {
        var update = Builders<Globals>.Update
            .Set(g => g.settings, settings)
            .Set(g => g.updatedAt, DateTime.UtcNow);

        await _globals.UpdateOneAsync(g => g.id == id, update);
    }

    public async Task<Globals?> GetByBlockIdAsync(string blockId) =>
        await _globals.Find(g => g.block_id == blockId).FirstOrDefaultAsync();

    public async Task<Globals?> GetByNameAsync(string name) =>
        await _globals.Find(g => g.name == name).FirstOrDefaultAsync();
}
