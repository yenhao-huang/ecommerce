from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from core.db import init_db, upsert_products
from core.search import normalize_product

ROOT = Path(__file__).resolve().parents[1]
COLLECTED = ROOT / "data" / "headphones_collected.json"
SEED = ROOT / "data" / "headphones_seed.json"
RAW = ROOT / "data" / "headphones_raw.json"


def _load(path: Path) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        return data
    if isinstance(data, dict) and isinstance(data.get("products"), list):
        return data["products"]
    if isinstance(data, dict) and isinstance(data.get("items"), list):
        return data["items"]
    return []


def main() -> None:
    items = _load(COLLECTED) or _load(SEED) + _load(RAW)
    normalized = [normalize_product(p, i + 1) for i, p in enumerate(items)]

    init_db()
    count = upsert_products(normalized)
    print(f"Ingested {count} products into PostgreSQL")


if __name__ == "__main__":
    main()
