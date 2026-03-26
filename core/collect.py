from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEED_PATH = ROOT / "data" / "headphones_seed.json"
RAW_PATH = ROOT / "data" / "headphones_raw.json"
OUT_PATH = ROOT / "data" / "headphones_collected.json"


def _load(path: Path):
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        return data
    if isinstance(data, dict) and isinstance(data.get("products"), list):
        return data["products"]
    return []


def main() -> None:
    items = []
    items.extend(_load(SEED_PATH))
    items.extend(_load(RAW_PATH))

    # de-duplicate by id/source_id/sourceId
    seen = set()
    dedup = []
    for p in items:
        sid = str(p.get("id") or p.get("source_id") or p.get("sourceId") or "")
        if not sid or sid in seen:
            continue
        seen.add(sid)
        dedup.append(p)

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUT_PATH.open("w", encoding="utf-8") as f:
        json.dump(dedup, f, ensure_ascii=False, indent=2)

    print(f"Collected {len(dedup)} products -> {OUT_PATH}")


if __name__ == "__main__":
    main()
