using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DtcBackend.Models;

public class Theme
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; } = null!;

    public string name { get; set; } = null!;

    public GlobalStyles globalStyles { get; set; } = new();

    public DateTime createdAt { get; set; } = DateTime.UtcNow;

    public DateTime updatedAt { get; set; } = DateTime.UtcNow;
}

public class GlobalStyles
{
    public string fontFamily { get; set; } = "Inter, sans-serif";
    public string primaryColor { get; set; } = "#1e40af";
    public HeadingScale headingScale { get; set; } = new();
    public int baseSpacing { get; set; } = 8;
}

public class HeadingScale
{
    public int h1 { get; set; } = 32;
    public int h2 { get; set; } = 28;
    public int h3 { get; set; } = 24;
}
