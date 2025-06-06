using DtcBackend.Configurations;
using DtcBackend.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DtcBackend.Services;

public class PageService
{
    private readonly IMongoCollection<Page> _pages;
    private readonly IMongoCollection<BlockDefinition> _blockDefinitions;
    private readonly IMongoCollection<Globals> _globalBlocks;

    public PageService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);

        _pages = database.GetCollection<Page>("pages");
        _blockDefinitions = database.GetCollection<BlockDefinition>("block_definitions");
        _globalBlocks = database.GetCollection<Globals>("globals");
    }

    public async Task<List<Page>> GetAllAsync() =>
        await _pages.Find(_ => true).ToListAsync();

    public async Task<Page?> GetByIdAsync(string id) =>
        await _pages.Find(p => p.id == id).FirstOrDefaultAsync();
    public async Task<Page?> GetFullPageByUrlAsync(string url)
    {
        var page = await _pages.Find(p => p.url == url).FirstOrDefaultAsync();
        if (page == null) return null;

        foreach (var block in page.blocks)
        {
            var blockDef = await _blockDefinitions
                .Find(b => b.id == block.blockDefinitionId)
                .FirstOrDefaultAsync();

            if (blockDef != null)
            {
                var blockDoc = blockDef.ToBsonDocument();
                var blockDict = blockDoc.ToDictionary(k => k.Name, v => BsonTypeMapper.MapToDotNetValue(v.Value));

                // Manually set _id and layout_id as string
                blockDict["id"] = blockDef.id;
                blockDict["layout_id"] = blockDef.layout_id;

                // Override settings and data if present
                if (block.settings != null)
                    blockDict["settings"] = block.settings;

                if (block.data != null)
                    blockDict["data"] = block.data;

                block.blockData = blockDict;
            }
        }

        // Header
        var headerDef = await _globalBlocks.Find(g => g.id == page.globals.header).FirstOrDefaultAsync();
        if (headerDef != null)
        {
            var headerDoc = headerDef.ToBsonDocument();
            var headerDict = headerDoc.ToDictionary(k => k.Name, v => BsonTypeMapper.MapToDotNetValue(v.Value));
            headerDict["id"] = headerDef.id;
            headerDict["layout_id"] = headerDef.layout_id;

            page.globals.headerData = headerDict;
        }

        // Footer
        var footerDef = await _globalBlocks.Find(g => g.id == page.globals.footer).FirstOrDefaultAsync();
        if (footerDef != null)
        {
            var footerDoc = footerDef.ToBsonDocument();
            var footerDict = footerDoc.ToDictionary(k => k.Name, v => BsonTypeMapper.MapToDotNetValue(v.Value));
            footerDict["id"] = footerDef.id;
            footerDict["layout_id"] = footerDef.layout_id;

            page.globals.footerData = footerDict;
        }

        return page;
    }


    public async Task CreateAsync(Page page)
    {
        page.createdAt = DateTime.UtcNow;
        page.updatedAt = DateTime.UtcNow;
        await _pages.InsertOneAsync(page);
    }

    public async Task UpdateAsync(string id, Page page)
    {
        page.updatedAt = DateTime.UtcNow;
        await _pages.ReplaceOneAsync(p => p.id == id, page);
    }

    public async Task DeleteAsync(string id) =>
        await _pages.DeleteOneAsync(p => p.id == id);
}
