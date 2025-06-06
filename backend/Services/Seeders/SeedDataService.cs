using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using DtcBackend.Configurations;

namespace DtcBackend.Services.Seeders;

public class SeedDataService
{
    private readonly IMongoDatabase _database;

    public SeedDataService(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public async Task SeedAsync()
    {
        var existingThemes = _database.GetCollection<BsonDocument>("themes");

        // ✅ Skip seeding if theme already exists
        var existingTheme = await existingThemes.Find(_ => true).FirstOrDefaultAsync();
        if (existingTheme != null)
        {
            Console.WriteLine("✅ Seed already exists. Skipping...");
            return;
        }
        var themeId = ObjectId.GenerateNewId();
        var layout2ColId = ObjectId.GenerateNewId();
        var layout6CardId = ObjectId.GenerateNewId();
        var tableBlockDefId = ObjectId.GenerateNewId();
        var listBlockDefId = ObjectId.GenerateNewId();
        var blockDefId = ObjectId.GenerateNewId();
        var pageId = ObjectId.GenerateNewId();
        var blockInstId = ObjectId.GenerateNewId();

        var themes = _database.GetCollection<BsonDocument>("themes");
        var layouts = _database.GetCollection<BsonDocument>("layouts");
        var blockDefs = _database.GetCollection<BsonDocument>("block_definitions");
        var pages = _database.GetCollection<BsonDocument>("pages");
        var blockInsts = _database.GetCollection<BsonDocument>("block_instances");

        await themes.InsertOneAsync(new BsonDocument
        {
            { "_id", themeId },
            { "name", "Modern Blue Theme" },
            { "globalStyles", new BsonDocument
                {
                    { "fontFamily", "Inter, sans-serif" },
                    { "primaryColor", "#1e40af" },
                    { "headingScale", new BsonDocument { { "h1", 32 }, { "h2", 28 }, { "h3", 24 } } },
                    { "baseSpacing", 8 }
                }
            },
            { "createdAt", DateTime.UtcNow },
            { "updatedAt", DateTime.UtcNow }
        });

        await layouts.InsertManyAsync(new[]
        {
            new BsonDocument
            {
                { "_id", layout2ColId },
                { "blockTypes", new BsonArray { "CardBlock", "TableBlock", "ListBlock" } },
                { "name", "2 Column Grid" },
                { "description", "Displays 2 cards per row" },
                { "htmlStructure", "<div class='grid grid-cols-2 gap-4'>{{content}}</div>" },
                { "defaultConfig", new BsonDocument { { "items", 2 } } },
                { "createdAt", DateTime.UtcNow },
                { "updatedAt", DateTime.UtcNow }
            },
            new BsonDocument
            {
                { "_id", layout6CardId },
                { "blockTypes", new BsonArray { "CardBlock", "ListBlock" } },
                { "name", "6 Card Layout" },
                { "description", "Displays 6 cards in two rows" },
                { "htmlStructure", "<div class='grid grid-cols-3 gap-6'>{{content}}</div>" },
                { "defaultConfig", new BsonDocument { { "items", 6 } } },
                { "createdAt", DateTime.UtcNow },
                { "updatedAt", DateTime.UtcNow }
            }
        });

        await blockDefs.InsertOneAsync(new BsonDocument
        {
            { "_id", blockDefId },
            { "type", "CardBlock" },
            { "name", "Card" },
            { "defaultStructure", new BsonDocument
                {
                    { "title", "Card Title" },
                    { "text", "Card description goes here..." },
                    { "style", new BsonDocument
                        {
                            { "padding", "16px" },
                            { "backgroundColor", "#ffffff" },
                            { "color", "#1e293b" }
                        }
                    }
                }
            },
            { "editableFields", new BsonArray { "title", "text", "style" } },
            { "availableLayouts", new BsonArray { layout2ColId, layout6CardId } },
            { "category", "Common" },
            { "icon", "/icons/card.svg" },
            { "createdAt", DateTime.UtcNow },
            { "updatedAt", DateTime.UtcNow }
        });

        await blockDefs.InsertOneAsync(new BsonDocument
        {
            { "_id", tableBlockDefId },
            { "type", "TableBlock" },
            { "name", "Dynamic Table" },
            { "defaultStructure", new BsonDocument
                {
                    { "columns", new BsonArray { "Name", "Email", "Role" } },
                    { "rows", new BsonArray
                        {
                            new BsonArray { "Alice", "alice@example.com", "Admin" },
                            new BsonArray { "Bob", "bob@example.com", "User" }
                        }
                    },
                    { "style", new BsonDocument
                        {
                            { "border", "1px solid #e5e7eb" },
                            { "padding", "12px" },
                            { "fontSize", "14px" }
                        }
                    }
                }
            },
            { "editableFields", new BsonArray { "columns", "rows", "style" } },
            { "availableLayouts", new BsonArray { layout2ColId } },
            { "category", "Data" },
            { "icon", "/icons/table.svg" },
            { "createdAt", DateTime.UtcNow },
            { "updatedAt", DateTime.UtcNow }
        });

        await blockDefs.InsertOneAsync(new BsonDocument
        {
            { "_id", listBlockDefId },
            { "type", "ListBlock" },
            { "name", "Bullet List" },
            { "defaultStructure", new BsonDocument
                {
                    { "title", "Features" },
                    { "items", new BsonArray
                        {
                            "Fast performance",
                            "Customizable UI",
                            "Easy integration"
                        }
                    },
                    { "style", new BsonDocument
                        {
                            { "padding", "16px" },
                            { "backgroundColor", "#ffffff" },
                            { "color", "#1f2937" },
                            { "fontSize", "16px" }
                        }
                    }
                }
            },
            { "editableFields", new BsonArray { "title", "items", "style" } },
            { "availableLayouts", new BsonArray { layout2ColId, layout6CardId } },
            { "category", "Common" },
            { "icon", "/icons/list.svg" },
            { "createdAt", DateTime.UtcNow },
            { "updatedAt", DateTime.UtcNow }
        });

        await pages.InsertOneAsync(new BsonDocument
        {
            { "_id", pageId },
            { "themeId", themeId },
            { "name", "Home" },
            { "slug", "/" },
            { "blocks", new BsonArray
                {
                    new BsonDocument
                    {
                        { "blockDefId", blockDefId },
                        { "instanceId", blockInstId },
                        { "layoutId", layout2ColId },
                        { "content", new BsonDocument
                            {
                                { "title", "Welcome to Our Site" },
                                { "text", "We offer high-quality services and awesome experiences." },
                                { "style", new BsonDocument
                                    {
                                        { "backgroundColor", "#f0f9ff" },
                                        { "color", "#0f172a" },
                                        { "padding", "24px" }
                                    }
                                }
                            }
                        },
                        { "position", 0 }
                    }
                }
            },
            { "metadata", new BsonDocument
                {
                    { "title", "Home - My Brand" },
                    { "description", "Welcome page for visitors" }
                }
            },
            { "createdAt", DateTime.UtcNow },
            { "updatedAt", DateTime.UtcNow }
        });

        await blockInsts.InsertOneAsync(new BsonDocument
        {
            { "blockDefId", blockDefId },
            { "instanceId", blockInstId },
            { "layoutId", layout2ColId },
            { "content", new BsonDocument
                {
                    { "title", "Welcome to Our Site" },
                    { "text", "We offer high-quality services and awesome experiences." },
                    { "style", new BsonDocument
                        {
                            { "backgroundColor", "#f0f9ff" },
                            { "color", "#0f172a" },
                            { "padding", "24px" }
                        }
                    }
                }
            },
            { "position", 0 }
        });
    }
}
