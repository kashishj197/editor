using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DtcBackend.Models;

public class Globals
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; } = null!;
    [BsonRepresentation(BsonType.ObjectId)]
    public string block_id { get; set; } = null!;

    [BsonElement("name")]
    public string name { get; set; } = null!;

    [BsonRepresentation(BsonType.ObjectId)]
    public string layout_id { get; set; } = null!;

    [BsonElement("settings")]
    public BlockSettings settings { get; set; } = new();

    [BsonElement("data")]
    public Dictionary<string, object> data { get; set; } = new();

    [BsonElement("access")]
    public BlockAccess access { get; set; } = new();

    [BsonElement("unique")]
    public bool unique { get; set; } = false;

    [BsonElement("location")]
    public string location { get; set; } = "page"; // "header", "footer", "page"

    [BsonElement("createdAt")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;
}