import GiphyService from "./GiphyService.js";
import GiphyUi from "./GiphyUi.js";
import "./style.css";
import "./styleMobile.css";
//
let termoAtual = "";
let offsetAtual = 0;
let numeroDeGifs = 12;
let carregandoMais = false; // Evita requisições duplicadas enquanto rola
//
const apiKey = "WRBj0eoDL3IWCrGwu3pc1VX8UJdiqyjq";
const url = "https://api.giphy.com/v1/gifs/search";
//
const ui = new GiphyUi();
const service = new GiphyService(apiKey, url, numeroDeGifs);
//
async function executarNovaBusca(termo) {
  termoAtual = termo;
  offsetAtual = 0;
  ui.botaoBloquear();
  ui.telaLimpar();
  ui.exibirMensagens("Carregando Gifs..");

  try {
    const dados = await service.buscarGifs(termoAtual, offsetAtual);

    if (dados.length === 0) {
      ui.exibirMensagens("Nenhum GIF encontrado.");
    } else {
      ui.telaLimpar();
      ui.exibirGifs(dados);
      ui.inputLimpar();
    }
  } catch (erro) {
    ui.exibirMensagens("Erro ao buscar GIFs. Tente novamente.");
  } finally {
    // O finally roda SEMPRE, dando certo ou errado, garantindo o destrava do botão!
    ui.botaoDesbloquear();
  }
}
//
async function carregarMaisGifs() {
  // 1. Trava: Se não tem busca ativa OU se já está carregando, não faz nada
  if (termoAtual === "" || carregandoMais) return;

  carregandoMais = true;
  offsetAtual += service.numeroDeGifs;

  try {
    const novosGifs = await service.buscarGifs(termoAtual, offsetAtual);

    // 2. Se vieram GIFs, apenas ADICIONA na tela (sem limpar nada!)
    if (novosGifs.length > 0) {
      ui.exibirGifs(novosGifs);
    }
  } catch (erro) {
    ui.exibirMensagens("Erro ao carregar mais GIFs.");
  } finally {
    // 3. Destrava o controle de requisição
    carregandoMais = false;
  }
}
//
ui.botaoClique(executarNovaBusca);
ui.teclaEnter();
ui.telaLimite(carregarMaisGifs);
