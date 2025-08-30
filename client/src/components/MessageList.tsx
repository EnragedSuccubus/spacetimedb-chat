import { type JSX } from 'react';
import type { PrettyMessage } from '../hooks/usePrettyMessages';

type Props = {
    messages: PrettyMessage[];
};

export default function MessageList({ messages }: Props): JSX.Element {
    if (messages.length < 1) {
        return <p>No messages yet.</p>;
    }

    return (
        <div>
            {messages.map((m, idx) => (
                <div key={idx}>
                    <p><b>{m.senderName}</b></p>
                    <p>{m.text}</p>
                </div>
            ))}
        </div>
    );
}