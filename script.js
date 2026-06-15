const nome = document.querySelector('.nome');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 8;
  const y = (e.clientY / window.innerHeight - 0.5) * 8;
  if (nome) {
    nome.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }
});

document.addEventListener('mouseleave', () => {
  if (nome) nome.style.transform = '';
});
