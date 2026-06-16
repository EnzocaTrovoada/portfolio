const USUARIO = 'EnzocaTrovoada';

async function carregarRepos() {
  const lista = document.getElementById('lista');
  if (!lista) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${USUARIO}/repos?sort=updated&per_page=30`
    );
    if (res.status === 403 || res.status === 429) {
      lista.innerHTML = '<p class="lista-msg">limite da API do github atingido. tente novamente em alguns minutos.</p>';
      return;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const repos = await res.json();
    const publicos = repos.filter(r => !r.fork && r.name !== 'portfolio' && r.name !== USUARIO);

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

// typewriter na bio
(function() {
  const bio = document.querySelector('.bio');
  if (!bio) return;
  const texto = bio.textContent.trim();
  bio.innerHTML = '<span id="bio-texto"></span><span class="cursor-tipo">|</span>';
  const el = document.getElementById('bio-texto');
  let i = 0;
  setTimeout(() => {
    const timer = setInterval(() => {
      el.textContent = texto.slice(0, ++i);
      if (i >= texto.length) {
        clearInterval(timer);
        setTimeout(() => { const c = bio.querySelector('.cursor-tipo'); if (c) c.remove(); }, 1200);
      }
    }, 45);
  }, 500);
})();

// konami code easter egg
(function() {
  const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let idx = 0;
  document.addEventListener('keydown', e => {
    idx = (e.key === seq[idx]) ? idx + 1 : (e.key === seq[0] ? 1 : 0);
    if (idx === seq.length) { idx = 0; ativarGlitch(); }
  });
  function ativarGlitch() {
    const nome = document.querySelector('.nome');
    if (!nome) return;
    const overlay = document.createElement('div');
    overlay.className = 'konami-overlay';
    overlay.textContent = '⚡ TROVOADA ⚡';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => { overlay.style.opacity = '1'; });
    nome.classList.add('glitch-ativo');
    setTimeout(() => {
      overlay.style.opacity = '0';
      nome.classList.remove('glitch-ativo');
      setTimeout(() => overlay.remove(), 400);
    }, 2600);
  }
})();
