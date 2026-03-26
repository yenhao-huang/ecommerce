const form = document.getElementById('search-form');
const qInput = document.getElementById('q');
const results = document.getElementById('results');

function render(items = []) {
  if (!items.length) {
    results.innerHTML = '<div class="result-item">找不到結果，試試其他關鍵字。</div>';
    return;
  }
  results.innerHTML = items.map((it) => `
    <article class="result-item card">
      <h3>${it.title}</h3>
      <p>${it.description ?? ''}</p>
      <p class="meta">評分：${it.rating ?? 'N/A'} ｜ 品牌：${it.metadata?.brand ?? 'N/A'} ｜ 相似度：${(it.score ?? 0).toFixed(3)}</p>
      ${it.image_url ? `<a target="_blank" href="${it.image_url}">查看圖片</a>` : ''}
    </article>
  `).join('');
}

async function runSearch(query) {
  results.innerHTML = '<div class="result-item">搜尋中...</div>';
  const res = await fetch(`/search?q=${encodeURIComponent(query)}&limit=6`);
  const data = await res.json();
  render(data.items || []);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  await runSearch(qInput.value.trim());
});

runSearch(qInput.value);
