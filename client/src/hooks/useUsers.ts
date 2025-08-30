import { useEffect, useState } from 'react';
import type { DbConnection, EventContext, User } from '../module_bindings';
import { userIdentityToString } from '../utils/identity';

export function useUsers(conn: DbConnection | null): Map<string, User> {
    const [users, setUsers] = useState<Map<string, User>>(new Map());

    useEffect(() => {
        if (!conn) {
            return;
        }

        const onInsert = (_ctx: EventContext, user: User) => {
            setUsers(prevUser => new Map(prevUser.set(userIdentityToString(user), user)));
        };

        const onUpdate = (_ctx: EventContext, oldUser: User, newUser: User) => {
            setUsers((prevUser) => {
                const copy = new Map(prevUser);
                copy.delete(userIdentityToString(oldUser));
                copy.set(userIdentityToString(newUser), newUser);

                return copy;
            });
        };

        const onDelete = (_ctx: EventContext, user: User) => {
            setUsers((prevUser) => {
                const copy = new Map(prevUser);
                copy.delete(userIdentityToString(user));

                return copy;
            });
        };

        conn.db.user.onInsert(onInsert);
        conn.db.user.onUpdate(onUpdate);
        conn.db.user.onDelete(onDelete);

        return () => {
            conn.db.user.removeOnInsert(onInsert);
            conn.db.user.removeOnUpdate(onUpdate);
            conn.db.user.removeOnDelete(onDelete);
        };
    }, [conn]);

    return users;
}