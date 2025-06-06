using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DtcBackend.Models;

public class BlockDefinition
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; } = null!;

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

public class BlockSettings
{
    [BsonElement("paddings")]
    public PaddingSettings paddings { get; set; } = new();

    [BsonElement("background")]
    public BackgroundSettings background { get; set; } = new();
}

public class PaddingSettings
{
    [BsonElement("top")]
    public int top { get; set; } = 80;

    [BsonElement("bottom")]
    public int bottom { get; set; } = 80;
}

public class BackgroundSettings
{
    [BsonElement("type")]
    public string type { get; set; } = "color";

    [BsonElement("background_color_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? backgroundColorId { get; set; } = null;
}

public class BlockAccess
{
    [BsonElement("duplicate")]
    public bool duplicate { get; set; } = false;

    [BsonElement("delete")]
    public bool delete { get; set; } = true;

    [BsonElement("sortable")]
    public bool sortable { get; set; } = true;
}
