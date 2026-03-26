from __future__ import annotations
import json
from pathlib import Path
from typing import Any
DATA_FILES = [Path(__file__).resolve().parents[1] / "data" / "headphones_seed.json", Path(__file__).resolve().parents[1] / "data" / "headphones_raw.json"]
def _load_products() -> list[dict[str, Any]]:
    for path in DATA_FILES:
        if path.exists():
            with path.open("r", encoding="utf-8") as f:
                data = json.load(f)
            if isinstance(data, list): return data
            if isinstance(data, dict) and isinstance(data.get("products"), list): return data["products"]
    return []
PRODUCTS = _load_products()
def normalize_product(p: dict[str, Any], index: int) -> dict[str, Any]:
    source_id = str(p.get("id") or p.get("source_id") or p.get("sourceId") or f"item-{index}")
    title = p.get("title") or p.get("name") or f"Headphone {index}"
    description = p.get("description") or p.get("summary") or ""
    category = p.get("category") or "headphones"
    price = p.get("price")
    image_url = p.get("image_url") or p.get("image") or p.get("thumbnail")
    slug = str(title).lower().replace(" ", "-")[:80]
    return {"source_id": source_id, "slug": slug, "title": title, "description": description, "category": category, "price": price, "image_url": image_url, "raw": p}
def all_products() -> list[dict[str, Any]]: return [normalize_product(p, i + 1) for i, p in enumerate(PRODUCTS)]
def search_products(query: str, limit: int = 10, offset: int = 0) -> list[dict[str, Any]]:
    items = all_products(); q = query.strip().lower()
    if q: items = [p for p in items if q in p["title"].lower() or q in p["description"].lower() or q in p["category"].lower()]
    return items[offset : offset + limit]
def get_product(source_id: str) -> dict[str, Any] | None:
    for p in all_products():
        if p["source_id"] == source_id: return p
    return None
