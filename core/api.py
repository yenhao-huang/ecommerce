from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from core.search import all_products, get_product, search_products
app = FastAPI(title="Headphone Ecommerce API")
app.add_middleware(CORSMiddleware, allow_origins=["http://127.0.0.1:3000", "http://localhost:3000"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
@app.get("/")
def root(): return {"service": "headphone_ecommerce", "status": "ok"}
@app.get("/health")
def health(): return {"ok": True, "count": len(all_products())}
@app.get("/search")
def search(q: str = Query(default=""), limit: int = 10, offset: int = 0): return {"query": q, "items": search_products(q, limit=limit, offset=offset)}
@app.get("/products")
def products(limit: int = 20, offset: int = 0):
    items = all_products(); return {"total": len(items), "items": items[offset : offset + limit]}
@app.get("/products/{source_id}")
def product_detail(source_id: str):
    item = get_product(source_id)
    if not item: raise HTTPException(status_code=404, detail="Product not found")
    return item
