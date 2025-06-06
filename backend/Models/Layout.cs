using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace DtcBackend.Models;

public class Layout
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; } = null!;

    [JsonIgnore]
    public int? __v { get; set; } = 0;

    [BsonElement("name")]
    public string name { get; set; } = null!;

    [BsonElement("template")]
    public Dictionary<string, object> template { get; set; } = new();

    [BsonElement("styles")]
    public Dictionary<string, object> styles { get; set; } = new();

    [BsonElement("createdAt")]
    public DateTime createdAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime updatedAt { get; set; } = DateTime.UtcNow;
}
