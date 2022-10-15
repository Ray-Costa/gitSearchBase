const statusNaoEncontrado = document.querySelector(".span-input")
statusNaoEncontrado.className = "display-none"

const btnPesquisar = document.querySelector('.btn-perfil-git');
const tagUl = document.getElementById("ul-achados")

let ultimosAcessados = JSON.parse(localStorage.getItem('ultimosAcessos')) || [];

function pesquisar(event) {
    event.preventDefault()
    const input = document.getElementById("input-pesquisar")
    btnPesquisar.innerHTML = `
    <div class="lds-ring ">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
`
    fetch(`https://api.github.com/users/${input.value}`)
        .then((dadosDoUsuario) => dadosDoUsuario.json())
        .then((dadosDoUsuario) => {
            if (dadosDoUsuario.message == "Not Found") {
                statusNaoEncontrado.className = "span"
                btnPesquisar.innerText = `Ver perfil do github`;
            } else {
                buscarRepositoriosIrParaProximaPagina(dadosDoUsuario)
            }
        })
}


if (ultimosAcessados.length == 0) {
    criarAcessadosRecentementeNoDOM.className = "display-none"
}

function logicaDeTransicaoParaPaginaDePerfil(dadosDoUsuario, dadosDoRepositorio) {
    // Adiciona os dados do usuario no localStorage
    localStorage.setItem('dadosDoUsuario', JSON.stringify(dadosDoUsuario));
    // Adiciona os dados dos repositorios no localStorage
    localStorage.setItem('repositorios', JSON.stringify(dadosDoRepositorio));
    armazenaUltimosAcessos(dadosDoUsuario);
    // Redireciona para a pagina do perfil
    window.location.href = '/pages/profile/index.html';
}

function armazenaUltimosAcessos(acesso) {
    let estaNaLista = false;
    for (let index = 0; index < ultimosAcessados.length; index++) {
        const objeto = ultimosAcessados[index];
        if (objeto.login == acesso.login) {
            estaNaLista = true;
        }
    }

    if (!estaNaLista) {
        ultimosAcessados.push(acesso);

        if (ultimosAcessados.length > 3) {
            ultimosAcessados.splice(0, 1);

        }
        localStorage.setItem('ultimosAcessos', JSON.stringify(ultimosAcessados));
    }
}

function criarAcessadosRecentementeNoDOM(obj) {

    const tagLi = document.createElement("li")
    const tagImagem = document.createElement("img")
    const tagSpan = document.createElement("span")
    const tagA = document.createElement("a")
    const tagDivToolTip = document.createElement("div");
    tagDivToolTip.className = "tooltip"

    tagUl.className = 'tag-ul'
    tagLi.className = 'tag-li'
    tagImagem.className = 'tag-imagem'
    tagA.className = 'a'
    tagA.innerText = "Acessar este perfil"

    tagA.addEventListener('click', () => {
        buscarRepositoriosIrParaProximaPagina(obj);
    })

    tagSpan.className = 'tooltiptext'

    tagImagem.src = obj.avatar_url

    tagSpan.appendChild(tagA)
    tagLi.appendChild(tagImagem)
    tagLi.appendChild(tagSpan)
    tagDivToolTip.appendChild(tagLi)
    tagUl.appendChild(tagDivToolTip)
}

function renderizarUltimosAcessados() {
    ultimosAcessados.forEach((repositorio) => {
        criarAcessadosRecentementeNoDOM(repositorio);
    });
}

function buscarRepositoriosIrParaProximaPagina(dadosDoUsuario) {
    fetch(`https://api.github.com/users/${dadosDoUsuario.login}/repos`)
        .then((repositorios) => repositorios.json())
        .then((repositorios) => {
            // Realiza o que eh necessario para ir para proxima pagina
            logicaDeTransicaoParaPaginaDePerfil(dadosDoUsuario, repositorios);
        });
}

function digitandoPerfilParaPesquisar(event) {
    const btnPesquisar = document.getElementById('pesquisar-botao');
    if (event.value && event.value.length) {
        btnPesquisar.classList.add('btn-enabled');
        btnPesquisar.disabled = false;
    } else {
        btnPesquisar.classList.remove('btn-enabled');
        btnPesquisar.disabled = true;
    }
}

renderizarUltimosAcessados();