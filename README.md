# Spacetime Chat

A minimal real‑time chat application with:
- Client: React + TypeScript + Vite (in client/)
- Server: SpacetimeDB module written in C# (.NET 8, WASI) (in server/)

The client connects to a [SpacetimeDB](https://spacetimedb.com/home) node over WebSocket and uses generated, type‑safe bindings to read/write chat data in real time.
This project is NOT intended for production use, but a demo and guide of using SpacetimeDB for real time communications and greatly simplify the systems architecture.

_**NOTE**_: A video tutorial will be available soon along with a redesigned client interface.

## Repository layout
- client/ – React app which contains generated SpacetimeDB bindings in `client/src/module_bindings/`
- server/ – C# SpacetimeDB module (tables + reducers) for interacting with chat data

## Prerequisites
- Node.js 20.19+ (required by Vite 7 and @vitejs/plugin-react)
- pnpm (recommended, pnpm-lock.yaml present)
- .NET SDK 8.0+
- SpacetimeDB CLI [GitHub Link](https://github.com/clockworklabs/SpacetimeDB/blob/master/README.md#installation)

## Running the Application
1. Start the [SpacetimeDB](https://github.com/clockworklabs/SpacetimeDB/blob/master/README.md#getting-started) node.

2. Publish the server to SpacetimeDB (_this assumes you have the CLI installed locally_)
   - Use the publish helper script in the [Cross-platform SpacetimeDB module helper scripts](#cross-platform-spacetimedb-module-helper-scripts)
   - Results should look something like this:
    ```text
    Optimising module with wasm-opt...
    Build finished successfully.
    Uploading to local => http://127.0.0.1:3000
    This will DESTROY the current spacetime-chat module, and ALL corresponding data.
    Are you sure you want to proceed? [deleting spacetime-chat] [y/N] y
    Publishing module...
    Updated database with name: spacetime-chat, identity: c20071a681b8e8fe4bc5e3f3686a64498dec28a7304c4a6dca4df6b8312656b9i
    ```

3. Install the client dependencies
```bash
cd client
pnpm install
```

4. Run the client
```bash
pnpm run dev
```

5. Navigate to the Local URL from VITE after running the dev server. e.g. http://localhost:5173

That’s it. Open two browser tabs to chat with yourself.

## What this app does
This repo is a demo of a minimal real-time chat application using:
- React + TypeScript + Vite (client/)
- SpacetimeDB module (server/)

##### SpacetimeDB module
- Tables (server/Tables.cs):
  - User: Identity (PK), Name?, Online
  - Message: Sender (Identity), Sent (Timestamp), Text (string)
- Reducers (server/Reducers/Reducers.cs):
  - SetName(name: string)
  - SendMessage(text: string)
- Client subscribes to SELECT * FROM Message and SELECT * FROM User and updates the UI live.

### Cross-platform SpacetimeDB module helper scripts
macOS/Linux (POSIX sh)
```sh
./conf/generate.sh
./conf/publish.sh
```

Windows PowerShell (PowerShell 7+)
```powershell
pwsh -File .\conf\generate.ps1
pwsh -File .\conf\publish.ps1
```

If blocked by execution policy:
```powershell
pwsh -ExecutionPolicy Bypass -File .\conf\generate.ps1
```

Notes
- Scripts resolve the repository root automatically; run them from any directory.
- .gitattributes enforces LF for .sh and CRLF for .ps1 so they clone with correct line endings.

## Configuration notes
- SERVER_URI and MODULE_NAME are defined in client/src/context/ConnectionContext.tsx.
- If this repo contains a redacted URI (e.g., ws://*********:3000), replace it with your actual endpoint.

## Troubleshooting
- Client can’t connect:
  - Ensure the SpacetimeDB node is reachable at SERVER_URI.
  - Confirm the module name in the client matches the name used at deployment.
- No messages appear:
  - Verify the module is deployed and reducers are present (SetName, SendMessage).
  - Check browser console for connection or reducer errors.
- Type errors when building the client:
  - Ensure Node >= 20.19 and pnpm are installed.
