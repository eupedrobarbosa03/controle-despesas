const inputs = {
    nomeDespesa: document.querySelector("#nome-despesa"),
    valorDespesa: document.querySelector("#valor-despesa")
}

const buttonEnviar = document.querySelector("#button-inserir-despesas");
const messageInfo = document.querySelector("#message-info");

const valorAtualizadoDespesa = document.querySelector("#valor-atualizado");
const listaDespesa = document.querySelector("#lista-despesas");

function limparConteudoInputs() {
    inputs.nomeDespesa.value= "";
    inputs.valorDespesa.value = "";
}

function atualizarMessageInfo() {
    messageInfo.textContent = "";
    messageInfo.style.display = "none"
}

function messageError(message) {
    messageInfo.style.display = "block";
    messageInfo.style.color = "red";
    messageInfo.textContent = message;
}

class Despesa {
    constructor(nome, valor) {
        this.nome = nome;
        this.valor = valor;
    }

    analisarDespesa() {

        this.nome = String(this.nome);
        this.valor = Number(this.valor)

        if (this.nome.trim() === "") {
            messageError("Despesa sem nome!")
            return;
        }

        let numeros = [];

        for (let i = 0; i < 10; i++) {
            numeros.push(String(i));
        }

        if (numeros.includes(this.nome[0])) {
            messageError("Despesa não pode começar com números!")
            return;
        }

        const tamanhoMinimoNomeDespesa = 10;

        if (this.nome.length < tamanhoMinimoNomeDespesa) {
            messageError("Tamanho mínimo nome da Despesa: 10 caracteres.")
            return;
        }
        
        if (!this.valor || this.valor <= 0 || typeof this.valor !== "number") {
            messageError("Insira o valor. Observação: Somente números e maior que zero.")
            return
        }

        this.nome = this.nome.trim();
        atualizarMessageInfo();

        listaDespesa.style.display = "block"

        const ListUpdate = document.createElement("li");
        ListUpdate.setAttribute("class", "list-style")
        const nome = document.createElement("div");
        const valor = document.createElement("div");

        nome.setAttribute("class", "text");
        valor.setAttribute("class", "valor");

        ListUpdate.appendChild(nome);
        ListUpdate.appendChild(valor);

        listaDespesa.appendChild(ListUpdate);

        valorAtualizadoDespesa.textContent = `${parseFloat(Number(valorAtualizadoDespesa.textContent) + this.valor).toFixed(2)}`;

        nome.textContent = this.nome;
        valor.textContent = `-R$${parseFloat(this.valor).toFixed(2)}`

        limparConteudoInputs();

    }
}

buttonEnviar.addEventListener("click", () => {
    const despesa = new Despesa(inputs.nomeDespesa.value, inputs.valorDespesa.value);
    despesa.analisarDespesa();
})