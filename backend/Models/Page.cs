using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DtcBackend.Models;

public class Page
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; } = null!;

    [BsonElement("name")]
    public string name { get; set; } = null!;

    [BsonElement("url")]
    public string url { get; set; } = null!;

    [BsonElement("blocks")]
    public List<PageBlock> blocks { get; set; } = new();

    [BsonElement("globals")]
    public required PageGlobals globals { get; set; }

    [BsonElement("createdAt")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;
}

public class PageGlobals
{
    [BsonRepresentation(BsonType.ObjectId)]
    public required string header { get; set; }
    public Dictionary<string, object>? headerData { get; set; }

    [BsonRepresentation(BsonType.ObjectId)]
    public required string footer { get; set; }
    public Dictionary<string, object>? footerData { get; set; }
}

public class PageBlock
{
    [BsonElement("block_definition_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string blockDefinitionId { get; set; } = null!;

    [JsonIgnore]
    [BsonElement("settings")]
    public BlockSettings? settings { get; set; }

    [JsonIgnore]
    [BsonElement("data")]
    public Dictionary<string, object>? data { get; set; }
    public Dictionary<string, object>? blockData { get; set; }

    [BsonElement("createdAt")]
    public DateTime? createdAt { get; set; }

    [BsonElement("updatedAt")]
    public DateTime? updatedAt { get; set; }

    [BsonElement("position")]
    public int position { get; set; } = 0;
}