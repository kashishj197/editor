using DtcBackend.Configurations;
using DtcBackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DtcBackend.Services;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoCollection<Theme> Themes => _database.GetCollection<Theme>("themes");
    public IMongoCollection<Layout> Layouts => _database.GetCollection<Layout>("layouts");
    public IMongoCollection<BlockDefinition> BlockDefinitions => _database.GetCollection<BlockDefinition>("block_definitions");
    public IMongoCollection<Page> Pages => _database.GetCollection<Page>("pages");
}
