# Session-Store-Service

Tiny REST service used by the ElizaOSMpcSessions demo:

* **POST /api/session** &nbsp;— store the session-info JSON uploaded by the
  client side.  
* **GET  /api/session** &nbsp;— ElizaOs will fetch the sessionInfo from session-store service.  
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

## Local dev setup

```bash
# 1. deps
npm i

# 2. copy env template
cp .env.example .env            # keep DATABASE_TYPE=sqlite

# 3. run with ts-node
npm run dev

```

## Docker setup

```bash

docker compose -f docker-compose-local.yml up --build

```
