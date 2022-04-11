const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e){ // Capturar o evento de pressionar uma tecla e acionar o botão
    if (e.keyCode === 13){ // ao apertar "ENTER" uma tarefa é criada
        if (!inputTarefa.value) return;  // verifica se o input está vazio
        criaTarefa(inputTarefa.value); // chama a função de criar tarefa e cria uma tarefa com o que foi digitado no input
    }
}); 

function limpaInput(){ // Limpa o input
    inputTarefa.value = '';
    inputTarefa.focus(); // Faz o cursor do input piscar quando é selecionado
}

function criaBotaoApagar(li){ // Cria o botão para apagar algo da lista
    li.innerText += ' '; // Da um espaçamento
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar'); // cria uma classe no botão com o nome "apagar"
    botaoApagar.setAttribute('title', 'Apagar esta tarefa'); // quando passa o mouse por cima do botão aparece "apagar esta tarefa"
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput){ // função para criar a tarefa com um ponto no inicio
    const li = criaLi();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput(); // Após criar a tarefa é executada a função para limpar o input
    criaBotaoApagar(li); // Chama a função que apaga o botão quando a tarefa for criada
    salvarTarefas();
}

btnTarefa.addEventListener('click', function(e){ //Para capturar po evento de click no botão
    if (!inputTarefa.value) return;
   criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e){ // Captura o click do botão de apagar
    const el = e.target; // "el" significa elemento
    if (el.classList.contains('apagar')){ // verifica se o clique for da class "apagar" ele captura o click
        el.parentElement.remove(); // Remove o "pai" do botão, no caso é o item da lista e o botão
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim(); // Substitui a palavra "apagar" para vazio, para salvar somente a frase escrita na tarefa / .trim() -> remove o espaço no final da frase
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas); // Converte um elemento javascript para uma string no formato  JSON
    localStorage.setItem('tarefas', tarefasJSON);
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
     const listaDeTarefas = JSON.parse(tarefas); // Coverte as tarefas de volta para array

     for (let tarefa of listaDeTarefas) {
         criaTarefa(tarefa);
     }
}

addTarefasSalvas();