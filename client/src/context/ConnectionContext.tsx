import React, { createContext, type JSX, useContext, useEffect, useMemo, useState } from 'react';
import { DbConnection, type ErrorContext } from '../module_bindings';
import { Identity } from '@clockworklabs/spacetimedb-sdk';

type ConnectionState = {
    conn: DbConnection | null;
    identity: Identity | null;
    connected: boolean;
    error?: Error | null;
};

const ConnectionContext = createContext<ConnectionState>({
    conn: null,
    identity: null,
    connected: false,
    error: null,
});

const SERVER_URI = 'ws://127.0.0.1:3000';
const MODULE_NAME = 'spacetime-chat';
const TOKEN = localStorage.getItem('auth_token') || '';

export function ConnectionProvider({ children }: { children: React.ReactNode }): JSX.Element {
    const [conn, setConn] = useState<DbConnection | null>(null);
    const [identity, setIdentity] = useState<Identity | null>(null);
    const [connected, setConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // initialize connection
    useEffect(() => {
        const subscribeToQueries = (connection: DbConnection, queries: string[]) => {
            connection
                .subscriptionBuilder()
                .onApplied(() => {
                    console.log('SDK client cache initialized.');
                })
                .subscribe(queries);
        };

        const onConnect = (connection: DbConnection, id: Identity, token: string) => {
            setIdentity(id);
            setConnected(true);
            localStorage.setItem('auth_token', token);

            console.log('Connected with identity:', id.toHexString());

            connection.reducers.onSendMessage(() => {
                console.log('Message sent!');
            });

            subscribeToQueries(connection, ['SELECT * FROM Message', 'SELECT * FROM User']);
        };

        const onDisconnect = () => {
            console.log('Disconnected from server.');
            setConnected(false);
        };

        const onConnectError = (_ctx: ErrorContext, err: Error) => {
            console.error('Error connecting to server:', err);
            setError(err);
        };

        const connection = DbConnection.builder()
            .withUri(SERVER_URI)
            .withModuleName(MODULE_NAME)
            .withToken(TOKEN)
            .onConnect(onConnect)
            .onDisconnect(onDisconnect)
            .onConnectError(onConnectError)
            .build();

        setConn(connection);

        return () => {
            // DbConnectionImpl disconnects automatically on page unload; explicit cleanup not required here.
        };
    }, []);

    const value = useMemo(
        () => ({ conn, identity, connected, error }),
        [conn, identity, connected, error]
    );

    return (
        <ConnectionContext.Provider value={value}>
            { children }
        </ConnectionContext.Provider>
    );
}

export function useConnection(): ConnectionState {
    return useContext(ConnectionContext);
}
