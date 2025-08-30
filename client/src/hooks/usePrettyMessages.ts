import { useMemo } from 'react';
import type { Message, User } from '../module_bindings';

export type PrettyMessage = {
    senderName: string;
    text: string;
};

export function usePrettyMessages(
    messages: Message[],
    users: Map<string, User>
): PrettyMessage[] {
    return useMemo(() => {
        return [...messages]
            .sort((a, b) => (a.sent > b.sent ? 1 : -1))
            .map((m) => ({
                senderName: users.get(m.sender.toHexString())?.name ?? m.sender.toHexString().substring(0, 8),
                text: m.text,
            }));
    }, [messages, users]);
}