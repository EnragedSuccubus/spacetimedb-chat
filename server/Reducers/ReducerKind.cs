using SpacetimeDB;

namespace StdbModule;

public static partial class Module
{
    /// <summary>
    /// Runs when a client connects.
    /// We'll find an existing user in the database, or create a new one.
    /// </summary>
    /// <param name="ctx"></param>
    [Reducer(ReducerKind.ClientConnected)]
    public static void ClientConnected(ReducerContext ctx)
    {
        Log.Info($"Connect {ctx.Sender}");

        User? user = ctx.Db.User.Identity.Find(ctx.Sender);
        if (user is not null)
        {
            // If we are here, the user already exists in the database.
            // We'll want to set their online status to 'true'.
            user.Online = true;

            ctx.Db.User.Identity.Update(user);
        }
        else
        {
            // If we are here, we have a new user to add to the database.
            // Create a new User object and insert it into the database.
            ctx.Db.User.Insert(new User
            {
                Name = null,
                Identity = ctx.Sender,
                Online = true
            });
        }
    }

    /// <summary>
    /// Runs when a client disconnects.
    /// We'll want to set the user's online status to 'false' or log a warning if the user does not exist.
    /// </summary>
    /// <param name="ctx"></param>
    [Reducer(ReducerKind.ClientDisconnected)]
    public static void ClientDisconnected(ReducerContext ctx)
    {
        Log.Info($"Disconnect {ctx.Sender}");

        User? user = ctx.Db.User.Identity.Find(ctx.Sender);
        if (user is not null)
        {
            // Set the user's online status to 'false'.
            user.Online = false;

            ctx.Db.User.Identity.Update(user);
        }
        else
        {
            // User does not exist, so we'll want to log a warning about this.
            Log.Warn($"Warning: No user found for {ctx.Sender}");
        }
    }
}