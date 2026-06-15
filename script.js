const USUARIO = 'EnzocaTrovoada';

async function carregarRepos() {
  const grid = document.getElementById('grid');
  if (!grid) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${USUARIO}/repos?sort=updated&per_page=30`
    );
    if (!res.ok) throw new Error('erro na api');

    const repos = await res.json();
    const publicos = repos.filter(r => !r.fork && r.name !== 'portfolio');

    const count = document.getElementById('repo-count');
    if (count) count.textContent = `${publicos.length} repos`;

    if (publicos.length === 0) {
      grid.innerHTML = '<p class="grid-msg">nenhum repositório encontrado.</p>';
      return;
    }

    grid.innerHTML = publicos.map(repo => `
      <a class="card" href="projeto.html?repo=${encodeURIComponent(repo.name)}">
        <div class="card-hover">
          <p class="card-desc">${repo.description || 'sem descrição ainda.'}</p>
          <span class="card-cta">→ ver detalhes</span>
        </div>
        <span class="card-nome">${repo.name}</span>
        ${repo.language ? `<span class="card-lang">${repo.language}</span>` : ''}
      </a>
    `).join('');

  } catch (e) {
    grid.innerHTML = '<p class="grid-msg">não foi possível carregar os repositórios.</p>';
  }
}

carregarRepos();
