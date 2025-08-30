using SpacetimeDB;

namespace StdbModule;

public static partial class Module
{
    /// <summary>
    /// Store each user in the database with an associated identity, optional name, and online status.
    /// </summary>
    [Table(Name = "User", Public = true)]
    public partial class User
    {
        [PrimaryKey]
        public Identity Identity;

        public string? Name;
        public bool Online;
    }

    /// <summary>
    /// Store each message in the database with a sender (users Identity), timestamp, and text.
    /// </summary>
    [Table(Name = "Message", Public = true)]
    public partial class Message
    {
        public Identity Sender;
        public Timestamp Sent;
        public string Text = "";
    }
}