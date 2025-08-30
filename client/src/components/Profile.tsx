import React, { type JSX, useState } from 'react';
import { useConnection } from '../context/ConnectionContext';

type Props = {
    currentName: string;
};

export default function Profile({ currentName }: Props): JSX.Element {
    const { conn } = useConnection();
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(currentName);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setEditing(false);

        if (newName.trim().length > 0) {
            conn?.reducers.setName(newName.trim());
        }
    };

    if (!editing) {
        return (
            <>
                <p>{currentName}</p>
                <button
                    onClick={() => {
                        setEditing(true);
                        setNewName(currentName);
                    }}
                >Edit Name</button>
            </>
        );
    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={newName}
                onChange={event => setNewName(event.target.value)}
            />
        </form>
    );
}