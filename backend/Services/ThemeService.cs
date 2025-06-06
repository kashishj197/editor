using DtcBackend.Configurations;
using DtcBackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DtcBackend.Services;

public class ThemeService
{
    private readonly IMongoCollection<Theme> _themes;

    public ThemeService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _themes = database.GetCollection<Theme>("themes");
    }

    public async Task<List<Theme>> GetAllAsync() =>
        await _themes.Find(_ => true).ToListAsync();

    public async Task<Theme?> GetByIdAsync(string id) =>
        await _themes.Find(t => t.id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Theme theme)
    {
        theme.createdAt = DateTime.UtcNow;
        theme.updatedAt = DateTime.UtcNow;
        await _themes.InsertOneAsync(theme);
    }

    public async Task UpdateAsync(string id, Theme theme)
    {
        theme.updatedAt = DateTime.UtcNow;
        await _themes.ReplaceOneAsync(t => t.id == id, theme);
    }

    public async Task DeleteAsync(string id) =>
        await _themes.DeleteOneAsync(t => t.id == id);
}
