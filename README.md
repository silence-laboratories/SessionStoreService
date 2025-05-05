# Session-Store API (backend)

Tiny REST service used by the ElizaOSMpcSessions demo:

* **POST /api/session** &nbsp;— store the session-info JSON uploaded by the
  front-end.  
* **GET  /api/session** &nbsp;— return that JSON to the Eliza-OS agent.  
* **GET  /api/health** &nbsp;— liveness probe.

Powered by **Express + TypeORM**.  
Runs with **SQLite by default**

---

## End-points

| Method | Path | Header(s) | Body / Response |
|--------|------|-----------|-----------------|
| `POST` | `/api/session` | `x-user-id: <uuid>` | body = `{ sessionDetails, mpcSigner, …}`<br/>→ `201 Created` |
| `GET`  | `/api/session` | `x-user-id: <uuid>` | → stored JSON blob |
| `GET`  | `/api/health`  | — | `{"status":"OK","timestamp":"…"} ` |

---

## Local dev  (⚡ SQLite)

```bash
# 1. deps
npm i

# 2. copy env template
cp .env.example .env            # keep DATABASE_TYPE=sqlite

# 3. run with ts-node
npm run dev

```
The database file test.db appears in the repo root.


## Docker - Single-image(⚡ SQLite)

```bash
# 1. build
docker build -t session-store:sqlite .

# 2. run

docker run -p 3008:3008 --name session-store-demo session-store:sqlite

```
