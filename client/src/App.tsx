import { type JSX } from 'react';
import './App.css';

import { ConnectionProvider, useConnection } from './context/ConnectionContext';
import { useMessages } from './hooks/useMessages';
import { useUsers } from './hooks/useUsers';
import { useSystemMessages } from './hooks/useSystemMessages';
import { usePrettyMessages } from './hooks/usePrettyMessages';

import Profile from './components/Profile';
import MessageList from './components/MessageList';
import SystemPanel from './components/SystemPanel';
import NewMessageForm from './components/NewMessageForm';

/**
 * The App component serves as the main entry point of the chat app.
 * It initializes and manages state variables, establishes a database connection,
 * handles user interactions, and renders the UI for chat functionality, including system messages,
 * user profiles, and message threads. The component also integrates with the SpacetimeDB SDK
 * for managing real-time database interactions and subscriptions.
 *
 * @return {JSX.Element} The main JSX structure of the application including the chat interface,
 * user profile management, system messages, and new message form.
 */
function ChatApp(): JSX.Element {
    const { conn, identity, connected } = useConnection();

    const messages = useMessages(conn);
    const users = useUsers(conn);
    const systemMessage = useSystemMessages(conn);
    const prettyMessages = usePrettyMessages(messages, users);

    if (!conn || !connected || !identity) {
        return (
            <div className="App">
                <h1>Connecting...</h1>
            </div>
        );
    }

    const userName = users.get(identity?.toHexString())?.name ||
        identity?.toHexString().substring(0, 8) ||
        'unknown';

    return (
        <div className="App">
            <div className="profile">
                <h1>Profile</h1>
                <Profile currentName={userName} />
            </div>

            <div className="message">
                <h1>Messages</h1>
                <MessageList messages={prettyMessages} />
            </div>

            <div className="system" style={{ whiteSpace: 'pre-wrap' }}>
                <h1>System</h1>
                <SystemPanel message={systemMessage} />
            </div>

            <div className="new-message">
                <NewMessageForm />
            </div>
        </div>
    );
}

function App(): JSX.Element {
    return (
        <ConnectionProvider>
            <ChatApp />
        </ConnectionProvider>
    );
}

export default App;