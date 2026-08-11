class GiphyUi {
  //
  #input;
  #botao;
  #conteinerImagens;
  //
  constructor() {
    this.#input = document.getElementById("busca-input");
    this.#botao = document.querySelector(".busca-botao");
    this.#conteinerImagens = document.querySelector(".conteiner-gifs");
  }
  //
  inputLimpar() {
    this.#input.value = "";
  }
  //
  botaoBloquear() {
    this.#botao.disabled = true;
  }
  //
  botaoDesbloquear() {
    this.#botao.disabled = false;
  }
  //
  botaoClique(funcao) {
    // 2. Evento do Clique no Botão
    this.#botao.addEventListener("click", () => {
      const termoBuscado = this.#input.value;
      //
      this.#botao.classList.add("ativo");
      //
      setTimeout(() => {
        this.#botao.classList.remove("ativo");
      }, 150);

      if (termoBuscado.trim() !== "") {
        funcao(termoBuscado); // Chama nossa função!
      }
    });
  }
  //
  teclaEnter() {
    // 3. Evento do Enter no Input
    this.#input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        // 1. Adiciona a classe visual de pressionado
        this.#botao.classList.add("ativo");

        // 2. Remove a classe 150ms depois para dar o efeito de "piscar/pressionar"
        setTimeout(() => {
          this.#botao.classList.remove("ativo");
        }, 150);

        this.#botao.click();
      }
    });
  }
  //
  teclaEnterF(funcao) {
    this.#input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.#botao.classList.add("ativo");

        setTimeout(() => {
          this.#botao.classList.remove("ativo");
        }, 150);

        const termoBuscado = this.#input.value;
        if (termoBuscado.trim() !== "") {
          funcao(termoBuscado);
        }
      }
    });
  }
  //
  telaLimpar() {
    this.#conteinerImagens.innerHTML = "";
  }
  //
  telaLimite(funcao) {
    // 4. Detecta quando o usuário rola até o final da página
    window.addEventListener("scroll", () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement; //window e document sao proprias do DOM

      // Se o usuário rolou até faltar 200px para o fim da página:
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        funcao(); // chama a funcao passada
      }
    });
  }
  //
  exibirGifs(dados) {
    dados.forEach((gif) => {
      const imagem = document.createElement("img");
      imagem.src = gif.images.downsized_medium.url;
      imagem.alt = gif.title || "GIF do Giphy";
      this.#conteinerImagens.appendChild(imagem);
    });
  }
  //
  exibirMensagens(texto) {
    this.#conteinerImagens.innerHTML = `
      <div class="mensagem-status">
        <p>${texto}</p>
        <div class="spinner"></div>
      </div>
    `;
  }
  //
}
export default GiphyUi;
