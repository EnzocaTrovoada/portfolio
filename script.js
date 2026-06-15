const USUARIO = 'EnzocaTrovoada';

async function carregarRepos() {
  const lista = document.getElementById('lista');
  if (!lista) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${USUARIO}/repos?sort=updated&per_page=30`
    );
    if (!res.ok) throw new Error();

    const repos = await res.json();
    const publicos = repos.filter(r => !r.fork && r.name !== 'portfolio');

    const count = document.getElementById('repo-count');
    if (count) count.textContent = `${publicos.length} repos`;

    if (publicos.length === 0) {
      lista.innerHTML = '<p class="lista-msg">nenhum repositório encontrado.</p>';
      return;
    }

    // imagem de fundo: tenta assets/projetos/REPO.jpg, cai na OG do GitHub
    lista.innerHTML = publicos.map(repo => `
      <a class="card" href="projeto.html?repo=${encodeURIComponent(repo.name)}">
        <div class="card-topo">
          <span class="card-nome">${repo.name}</span>
          ${repo.language ? `<span class="card-lang">${repo.language}</span>` : ''}
        </div>
        <div class="card-corpo">
          <div class="card-corpo-inner">
            <div class="card-bg" data-repo="${repo.name}"></div>
            <p class="card-desc">${repo.description || 'sem descrição ainda.'}</p>
            <span class="card-cta">→ ver detalhes</span>
          </div>
        </div>
      </a>
    `).join('');

    // carrega imagens de fundo dos cards
    document.querySelectorAll('.card-bg').forEach(el => {
      const nome  = el.dataset.repo;
      const custom = `assets/projetos/${nome}.jpg`;
      const og     = `https://opengraph.githubassets.com/1/${USUARIO}/${nome}`;
      const img = new Image();
      img.onload  = () => { el.style.backgroundImage = `url('${custom}')`; };
      img.onerror = () => { el.style.backgroundImage = `url('${og}')`; };
      img.src = custom;
    });

  } catch (e) {
    lista.innerHTML = '<p class="lista-msg">não foi possível carregar os repositórios.</p>';
  }
}

carregarRepos();
