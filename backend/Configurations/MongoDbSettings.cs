// Configurations/MongoDbSettings.cs
namespace DtcBackend.Configurations;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
}
