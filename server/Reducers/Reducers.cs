using SpacetimeDB;

namespace StdbModule;

public static partial class Module
{
    /// <summary>
    /// Sets the name of the user if it passes validation.
    /// </summary>
    /// <param name="ctx"></param>
    /// <param name="name"></param>
    [Reducer]
    public static void SetName(ReducerContext ctx, string name)
    {
        name = ValidateName(name);

        User? user = ctx.Db.User.Identity.Find(ctx.Sender);
        if (user is not null)
        {
            user.Name = name;
            ctx.Db.User.Identity.Update(user);
        }
    }

    /// <summary>
    /// Sets a new message into the database for all connected clients.
    /// </summary>
    /// <param name="ctx"></param>
    /// <param name="text"></param>
    [Reducer]
    public static void SendMessage(ReducerContext ctx, string text)
    {
        text = ValidateMessage(text);
        
        Log.Info(text);

        ctx.Db.Message.Insert(new Message
        {
            Sender = ctx.Sender,
            Text = text,
            Sent = ctx.Timestamp
        });
    }
}