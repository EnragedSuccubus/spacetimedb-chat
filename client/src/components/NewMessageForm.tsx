import React, { type JSX, useState } from 'react';
import { useConnection } from '../context/ConnectionContext';

export default function NewMessageForm(): JSX.Element {
    const { conn } = useConnection();
    const [text, setText] = useState('');

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const trimmed = text.trim();
        if (!trimmed) {
            return;
        }

        conn?.reducers.sendMessage(trimmed);
        setText('');
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                margin: '0 auto',
            }}
        >
            <h3>New Message</h3>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
}