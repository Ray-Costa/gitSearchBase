const dadosDoUsuario = JSON.parse(localStorage.getItem('dadosDoUsuario'))
const repositorios = JSON.parse(localStorage.getItem('repositorios'));

document.getElementById('nome').innerText = dadosDoUsuario.name;
document.getElementById('bio').innerText = dadosDoUsuario.bio;
document.getElementById('imagem').src = dadosDoUsuario.avatar_url;

const ulMain = document.getElementById('ul-main');

function renderizarRepositorios() {
    repositorios.forEach((repositorio) => {
        criarOsCardsDosRepositorios(repositorio);
    });
}

function criarOsCardsDosRepositorios(repositorio) {

    const li = document.createElement('li');
    const tagDivItens = document.createElement("div")
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const divLinks = document.createElement("div")
    const linkRepositorio = document.createElement('a');
    const linkDemo = document.createElement('a');

    li.className = "cards-repositorio"
    h1.className = "titulo-repositorio"
    p.className = "descricao-repositorio"
    linkDemo.className = "link-demo"
    linkRepositorio.className = 'link-repositorio'
    tagDivItens.className = "div-itens"
    divLinks.className = "div-links"

    tagDivItens.appendChild(h1)
    tagDivItens.appendChild(p)
    tagDivItens.appendChild(divLinks)
    divLinks.appendChild(linkRepositorio)
    divLinks.appendChild(linkDemo)
    li.appendChild(tagDivItens)

    h1.innerText = repositorio.name;
    p.innerText = repositorio.description;

    linkRepositorio.innerText = `Repositório`
    linkRepositorio.addEventListener('click', () => {
        window.open(repositorio.html_url, '_blank');
    })
    linkDemo.innerText = `Demo`;
    if (repositorio.has_pages) {

        linkDemo.addEventListener('click', () => {
            window.open(repositorio.html_url, '_blank')
        })
    }

    ulMain.appendChild(li);

}

const botaoTrocarUsuario = document.querySelector(".botao-trocar-usuario");
botaoTrocarUsuario.addEventListener('click', () => {
    window.location.href = '/pages/home/index.html'
})

renderizarRepositorios();