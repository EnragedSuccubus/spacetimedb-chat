import { useEffect, useState } from 'react';
import type { DbConnection, EventContext, Message } from '../module_bindings';

export function useMessages(conn: DbConnection | null): Message[] {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (!conn) {
            return;
        }

        const onInsert = (_ctx: EventContext, message: Message) => {
            setMessages((prevMessage) => [...prevMessage, message]);
        };

        const onDelete = (_ctx: EventContext, message: Message) => {
            setMessages((prevMessage) =>
                prevMessage.filter(
                    (m) =>
                        !(m.text === message.text && m.sent === message.sent && m.sender === message.sender)
                )
            );
        };

        conn.db.message.onInsert(onInsert);
        conn.db.message.onDelete(onDelete);

        return () => {
            conn.db.message.removeOnInsert(onInsert);
            conn.db.message.removeOnDelete(onDelete);
        };
    }, [conn]);

    return messages;
}