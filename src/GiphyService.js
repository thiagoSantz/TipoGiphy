class GiphyService {
  //
  // 1. OBRIGATÓRIO: Declarar os campos privados no topo da classe
  #apiKey;
  #urlBase;
  #numeroDeGifs;
  //
  constructor(
    apiKey,
    urlBase = "https://api.giphy.com/v1/gifs/search",
    numeroDeGifs = 12,
  ) {
    this.#apiKey = apiKey;
    this.#urlBase = urlBase;
    this.#numeroDeGifs = numeroDeGifs;
  }

  // Getter opcional para ler a quantidade por página, se o controlador precisar
  get numeroDeGifs() {
    return this.#numeroDeGifs;
  }

  buscarGifs(termoAtual, offsetAtual) {
    //
    const url = `${this.#urlBase}?api_key=${this.#apiKey}&q=${termoAtual}&limit=${this.#numeroDeGifs}&offset=${offsetAtual}`;
    //
    return fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Erro na requisição com a API");
        return response.json();
      })
      .then((dados) => {
        // Retorna apenas o array de GIFs em formato puro
        return dados.data;
      })
      .catch((erro) => {
        console.error("Erro no GiphyService:", erro);
        throw erro; // Repassa o erro para a UI tratar na tela
      });
  }
}
export default GiphyService;
