// Adiciona linhas de scan horizontais animadas ao glitch
const glitch = document.querySelector('.glitch');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 6;
  const y = (e.clientY / window.innerHeight - 0.5) * 6;
  if (glitch) {
    glitch.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }
});

document.addEventListener('mouseleave', () => {
  if (glitch) {
    glitch.style.transform = '';
  }
});
