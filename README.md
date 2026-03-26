# Headphone Ecommerce

你說得對，前一版 README 被我在重建 repo 時寫成簡化版，資訊不完整。這版補回完整使用流程。

## Directory Structure

- `core/`
  - `api.py` — FastAPI Open API service
  - `config.py` — env/config settings
  - `db.py` — PostgreSQL init/query/upsert
  - `collect.py` — data collection merge script
  - `ingest.py` — ingest collected data into DB
  - `search.py` — search layer (DB first, JSON fallback)
- `data/`
  - `headphones_seed.json` — seed products
  - `headphones_raw.json` — raw collected products
  - `headphones_collected.json` — merged/dedup output (generated)
- `web/`
  - Next.js frontend

---

## 1) Setup

### Python backend deps

```bash
cd headphone_ecommerce
python -m venv .venv
source .venv/bin/activate
pip install fastapi "uvicorn[standard]" psycopg[binary]
```

### PostgreSQL + pgvector

確保本機 PostgreSQL 可用，並建立資料庫（例如 `ecommerce`）。

```bash
createdb ecommerce
```

設定環境變數（可選，預設是 `postgresql://localhost:5432/ecommerce`）：

```bash
export DATABASE_URL="postgresql://localhost:5432/ecommerce"
```

---

## 2) Data Collection

將 seed/raw 合併並去重，產出 `data/headphones_collected.json`：

```bash
cd headphone_ecommerce
python -m core.collect
```

---

## 3) Ingest Data to DB

初始化資料表並 upsert 到 PostgreSQL：

```bash
cd headphone_ecommerce
python -m core.ingest
```

---

## 4) Open API (FastAPI)

啟動 API：

```bash
cd headphone_ecommerce
uvicorn core.api:app --reload --port 8000
```

Endpoints:

- `GET /health`
- `GET /search?q=sony&limit=8`
- `GET /products?limit=20&offset=0`
- `GET /products/{source_id}`

Swagger UI:

- <http://127.0.0.1:8000/docs>

---

## 5) Frontend (Next.js)

```bash
cd headphone_ecommerce/web
npm install
npm run dev
```

Frontend URL:

- <http://127.0.0.1:3000>

預設前端打 `http://127.0.0.1:8000`。

---

## Notes

- CORS 已允許：
  - `http://127.0.0.1:3000`
  - `http://localhost:3000`
- `search.py` 是 **DB 優先**，若 DB 沒資料會 fallback 到 JSON。
