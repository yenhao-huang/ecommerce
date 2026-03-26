from __future__ import annotations

import json
from contextlib import contextmanager
from typing import Any, Iterator

import psycopg

from core.config import settings


@contextmanager
def get_conn() -> Iterator[psycopg.Connection]:
    conn = psycopg.connect(settings.database_url)
    try:
        yield conn
    finally:
        conn.close()


def init_db() -> None:
    with get_conn() as conn, conn.cursor() as cur:
        cur.execute("CREATE EXTENSION IF NOT EXISTS vector;")
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS products (
                id BIGSERIAL PRIMARY KEY,
                source_id TEXT UNIQUE NOT NULL,
                slug TEXT,
                title TEXT NOT NULL,
                description TEXT,
                category TEXT,
                price NUMERIC,
                image_url TEXT,
                metadata JSONB DEFAULT '{}'::jsonb
            );
            """
        )
        conn.commit()


def upsert_products(items: list[dict[str, Any]]) -> int:
    with get_conn() as conn, conn.cursor() as cur:
        for p in items:
            cur.execute(
                """
                INSERT INTO products (source_id, slug, title, description, category, price, image_url, metadata)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s::jsonb)
                ON CONFLICT (source_id) DO UPDATE SET
                  slug = EXCLUDED.slug,
                  title = EXCLUDED.title,
                  description = EXCLUDED.description,
                  category = EXCLUDED.category,
                  price = EXCLUDED.price,
                  image_url = EXCLUDED.image_url,
                  metadata = EXCLUDED.metadata;
                """,
                (
                    p["source_id"],
                    p.get("slug"),
                    p.get("title"),
                    p.get("description"),
                    p.get("category"),
                    p.get("price"),
                    p.get("image_url"),
                    json.dumps(p.get("raw", {})),
                ),
            )
        conn.commit()
    return len(items)


def list_products(limit: int = 20, offset: int = 0) -> list[dict[str, Any]]:
    with get_conn() as conn, conn.cursor() as cur:
        cur.execute(
            """
            SELECT source_id, slug, title, description, category, price, image_url, metadata
            FROM products
            ORDER BY id DESC
            LIMIT %s OFFSET %s
            """,
            (limit, offset),
        )
        rows = cur.fetchall()
    return [
        {
            "source_id": r[0],
            "slug": r[1],
            "title": r[2],
            "description": r[3],
            "category": r[4],
            "price": float(r[5]) if r[5] is not None else None,
            "image_url": r[6],
            "raw": r[7] or {},
        }
        for r in rows
    ]


def search_products_db(query: str, limit: int = 10, offset: int = 0) -> list[dict[str, Any]]:
    q = f"%{query}%"
    with get_conn() as conn, conn.cursor() as cur:
        cur.execute(
            """
            SELECT source_id, slug, title, description, category, price, image_url, metadata
            FROM products
            WHERE (%s = '%%') OR title ILIKE %s OR description ILIKE %s OR category ILIKE %s
            ORDER BY id DESC
            LIMIT %s OFFSET %s
            """,
            (q, q, q, q, limit, offset),
        )
        rows = cur.fetchall()
    return [
        {
            "source_id": r[0],
            "slug": r[1],
            "title": r[2],
            "description": r[3],
            "category": r[4],
            "price": float(r[5]) if r[5] is not None else None,
            "image_url": r[6],
            "raw": r[7] or {},
        }
        for r in rows
    ]


def get_product_db(source_id: str) -> dict[str, Any] | None:
    with get_conn() as conn, conn.cursor() as cur:
        cur.execute(
            """
            SELECT source_id, slug, title, description, category, price, image_url, metadata
            FROM products
            WHERE source_id = %s
            """,
            (source_id,),
        )
        row = cur.fetchone()
    if not row:
        return None
    return {
        "source_id": row[0],
        "slug": row[1],
        "title": row[2],
        "description": row[3],
        "category": row[4],
        "price": float(row[5]) if row[5] is not None else None,
        "image_url": row[6],
        "raw": row[7] or {},
    }
