# portfólio

Meu portfólio pessoal, no ar em [zocahop.com](https://zocahop.com). Site estático, sem framework e sem etapa de build: é HTML, CSS e JavaScript puro, hospedado na Hostinger.

## Como funciona

A lista de projetos não é escrita na mão. O `script.js` consulta a API pública do GitHub (`/users/EnzocaTrovoada/repos`), descarta os forks e monta um card para cada repositório, com nome, linguagem e descrição. Publicar um repositório novo já é o bastante para ele aparecer aqui.

Cada card leva para `projeto.html?repo=NOME`, que busca os detalhes daquele repositório na hora.

A imagem de fundo do card tenta primeiro `assets/projetos/NOME.jpg` e, quando esse arquivo não existe, cai na imagem que o próprio GitHub gera para o repositório.

## Arquivos

| arquivo | o que é |
|---|---|
| `index.html` | página inicial, com a lista de projetos |
| `projeto.html` | detalhes de um repositório, lidos pela API |
| `sobre.html` e `contato.html` | páginas fixas |
| `script.js` | busca na API do GitHub e montagem dos cards |
| `style.css` | estilo inteiro do site |
| `assets/` | imagens, incluindo as capas dos projetos |

## Visual

Preto e branco com cinzas frios, tipografia Bebas Neue e IBM Plex Mono, e duas camadas sobrepostas de ruído e scanlines para dar textura de impressão. Tem um easter egg escondido no Konami Code.

## Rodar na máquina

Por ser estático, abrir o `index.html` no navegador já funciona. Para evitar qualquer diferença de caminho relativo, dá para subir um servidor simples na pasta:

```bash
python -m http.server 8000
```

## Atenção ao publicar

O servidor guarda `.css` e `.js` em cache por dias, então substituir o arquivo não basta: é preciso subir o número da versão no link, como `style.css?v=6`, senão quem já visitou continua vendo a versão antiga.
