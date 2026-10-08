const form = document.querySelector('#formCadastro');

// ouvir evento de submit do formulário
form.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(Object.fromEntries([...form.elements]
        .filter(gatinho => gatinho.id)
        .map(gatinho => [gatinho.id, gatinho.value])
    ));
    form.reset();
});
