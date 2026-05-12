const url = `https://picsum.photos/v2/list`;
const body = document.querySelector("body");
const main = document.querySelector("main")
//criação de função assincrona para buscar os dados da url
async function getDados(url) {
    //Variavel para armazenar dados fetch
    //O primeiro "await" dentro dos parenteses aguarda o retorno da busca
    //O segundo "await" aguarda os dados serem transformados em JSON
    const dados = await (await fetch(url)).json();
    // console.table(dados);
    filtrarDados(dados);
}
//Inicia a função getDados e passa a variavel "url" como parametro de busca
getDados(url);
//Função para FIlTRAR os endereços (url's) das imagens recebidas
function filtrarDados(dados) {
    const urlIMG = dados.forEach((elemento) => {
        inserirIMG(elemento.download_url);

    });
}

function estilizarMural (){
    body.className = "flex items-center justify-center m-5";
    main.classList.add("columns-3", "gap-5" , "*:mt-5");
    button.className = ""

}

estilizarMural();

function inserirIMG(url){
    //cria o elemento IMG
    let img = document.createElement('img')
    //Adiciona o valor da url recebida dentro da propriedade src (source)
    img.src = url
    main.appendChild(img);
}



