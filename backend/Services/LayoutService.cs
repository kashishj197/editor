using DtcBackend.Configurations;
using DtcBackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DtcBackend.Services;

public class LayoutService
{
    private readonly IMongoCollection<Layout> _layouts;

    public LayoutService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _layouts = database.GetCollection<Layout>("layouts");
    }

    public async Task<List<Layout>> GetAllAsync() =>
        await _layouts.Find(_ => true).ToListAsync();

    public async Task<Layout?> GetByIdAsync(string id) =>
        await _layouts.Find(l => l.id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Layout layout)
    {
        layout.createdAt = DateTime.UtcNow;
        layout.updatedAt = DateTime.UtcNow;
        await _layouts.InsertOneAsync(layout);
    }

    public async Task UpdateAsync(string id, Layout layout)
    {
        layout.updatedAt = DateTime.UtcNow;
        await _layouts.ReplaceOneAsync(l => l.id == id, layout);
    }

    public async Task DeleteAsync(string id) =>
        await _layouts.DeleteOneAsync(l => l.id == id);
}
