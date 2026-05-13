const url = `https://picsum.photos/v2/list`;
const body = document.querySelector("body");
const main = document.querySelector("main");
const svg = document.querySelectorAll("svg");

// Função assíncrona que busca os dados da API
async function getDados(url) {
    const dados = await (await fetch(url)).json();
    filtrarDados(dados);
}

getDados(url);

// Percorre o array de fotos e chama inserirIMG para cada uma
function filtrarDados(dados) {
    dados.forEach((elemento) => {
        inserirIMG(elemento.download_url, elemento.author);
    });
}

// Aplica as classes Tailwind de layout na página
function estilizarMural() {
    // "relative" permite que os SVGs com "absolute" se posicionem corretamente
    body.className = "relative flex items-center justify-center m-5";

    // "columns-3" cria 3 colunas estilo mural/Pinterest
    // "gap-5" adiciona espaço entre as colunas
    // "*:mt-5" aplica margin-top em todos os filhos do main
    main.classList.add("columns-3", "gap-5", "*:mt-5");
}

estilizarMural();

// Cria e insere cada card (imagem + autor) no main
function inserirIMG(url, autor) {
    let div = document.createElement("div");

    // "overflow-hidden" impede a imagem de "vazar" fora do card durante o zoom
    div.classList.add("overflow-hidden");

    let img = document.createElement("img");
    img.src = url;

    // Zoom suave de 5% ao passar o mouse
    img.classList.add("transition-transform", "duration-300", "hover:scale-105");

    let p = document.createElement("p");
    p.textContent = ` ${autor}`;

    // "autor" é o seletor usado pelo darkMode para encontrar todos os <p>
    // "text-black" é a cor padrão no modo claro
    p.classList.add("autor", "text-black", "text-center", "text-sm", "mt-1");

    div.appendChild(img);
    div.appendChild(p);
    main.appendChild(div);
}

// Configura os ícones de sol/lua e os eventos de dark/light mode
function darkMode() {
    // Tamanho fixo via style inline para evitar SVG cortado ou distorcido
    svg[0].style.width = "40px";
    svg[0].style.height = "40px";
    svg[1].style.width = "40px";
    svg[1].style.height = "40px";

    // "z-50" mantém os ícones sempre na frente de qualquer outro elemento
    // Sol começa visível, lua começa oculta ("hidden")
    svg[0].classList.add("absolute", "top-4", "right-4", "cursor-pointer", "z-50");
    svg[1].classList.add("absolute", "top-4", "right-4", "cursor-pointer", "hidden", "z-50");

    // Clique no SOL → ativa Dark Mode
    svg[0].addEventListener("click", () => {
        svg[0].classList.add("hidden");
        svg[1].classList.remove("hidden");
        body.style.backgroundColor = "black";

        // Troca cor dos textos de autor para branco
        document.querySelectorAll(".autor").forEach((p) => {
            p.classList.remove("text-black");
            p.classList.add("text-white");
        });
    });

    // Clique na LUA → volta ao Light Mode
    svg[1].addEventListener("click", () => {
        svg[1].classList.add("hidden");
        svg[0].classList.remove("hidden");
        body.style.backgroundColor = "white";

        // Troca cor dos textos de autor para preto
        document.querySelectorAll(".autor").forEach((p) => {
            p.classList.remove("text-white");
            p.classList.add("text-black");
        });
    });
}

// Aguarda o carregamento completo da página antes de executar darkMode
window.addEventListener("load", () => {
    darkMode();
});