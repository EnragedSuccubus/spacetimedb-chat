import { useEffect, useState } from 'react';
import type { DbConnection, EventContext, User } from '../module_bindings';
import { userIdentityToString } from '../utils/identity';

export function useSystemMessages(conn: DbConnection | null): string {
    const [systemMessages, setSystemMessages] = useState('');

    useEffect(() => {
        if (!conn) {
            return;
        }

        const handleInsert = (_ctx: EventContext, user: User) => {
            if (user.online) {
                const name = user.name || userIdentityToString(user, true);
                setSystemMessages((prev) => `${prev}\n${name} joined the chat.`);
            }
        };

        const handleUpdate = (_ctx: EventContext, oldUser: User, newUser: User) => {
            const name = newUser.name || userIdentityToString(newUser, true);

            if (!oldUser.online && newUser.online) {
                setSystemMessages((prev) => `${prev}\n${name} has connected.`);
            } else if (oldUser.online && !newUser.online) {
                setSystemMessages((prev) => `${prev}\n${name} has disconnected.`);
            }
        };

        conn.db.user.onInsert(handleInsert);
        conn.db.user.onUpdate(handleUpdate);

        return () => {
            conn.db.user.removeOnInsert(handleInsert);
            conn.db.user.removeOnUpdate(handleUpdate);
        };
    }, [conn]);

    return systemMessages.trimStart();
}