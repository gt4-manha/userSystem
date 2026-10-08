const form = document.querySelector('#formCadastro');
const buscarCep = document.querySelector('#buscarCep');
const cep = document.querySelector('#cep');

function mensagem(texto, tipo = "sucesso") {
    Toastify({
        text: texto,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: tipo === "sucesso"
            ? "#198754"
            : "#dc3545"
        }
    }).showToast();
}

// ouvir evento de click do buscaCep
buscarCep.addEventListener("click", async function () {
    // expressão regex 
    const valor = cep.value.replace(/\D/g, "");
    if (valor.length !== 8) {
        mensagem("Digite um CEP válido.", "erro");
        return;
    } try {
        const resposta = await fetch(`https://viacep.com.br/ws/${valor}/json/`);
        const dados = await resposta.json();
        console.log(dados);
        if (!resposta.ok || dados.erro) 
            throw new Error("CEP não encontrado.");
        document.querySelector("#logradouro").value = dados.logradouro;
        document.querySelector("#bairro").value = dados.bairro;
        document.querySelector('#estado').value = dados.estado;
        document.querySelector('#cidade').value = dados.localidade;
        mensagem("Endereço encontrado!");
    } catch (erro) {
        mensagem(erro.message, "erro");
    }
});

// ouvir evento de submit do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(Object.fromEntries([...form.elements]
        .filter(gatinho => gatinho.id)
        .map(gatinho => [gatinho.id, gatinho.value])
    ));
    form.reset();
});
