// SISTEMA DE TRIAGEM — VERSÃO CORRIGIDA E FUNCIONAL

const fluxoTriagem = [
    {
        pergunta: "O paciente apresenta SINAIS VITAIS CRÍTICOS? (ex.: FR<10 ou >30, FC<40 ou >140, PAS<90, SpO2<90%)",
        opcoes: [
            { texto: "Sim", resultado: "EMERGÊNCIA! Encaminhar imediatamente para sala vermelha." },
            { texto: "Não", proximo: 1 }
        ]
    },

    {
        pergunta: "Há QUEIXAS AGUDAS GRAVES? (dor intensa, sangramento ativo, convulsão, dispneia importante)",
        opcoes: [
            { texto: "Sim", resultado: "URGÊNCIA! Atender prontamente na unidade." },
            { texto: "Não", proximo: 2 }
        ]
    },

    {
        pergunta: "O serviço necessário está DISPONÍVEL na USF Cabula VI?",
        opcoes: [
            { texto: "Sim", resultado: "Atendimento normal. Direcionar para o acolhimento da unidade." },
            { texto: "Não", proximo: 3 }
        ]
    },

    {
        pergunta: "Há necessidade de encaminhamento para outra unidade (UPA, emergência ou especialidade)?",
        opcoes: [
            { texto: "Sim", resultado: "Encaminhamento necessário. Orientar sobre local adequado e sinais de alerta." },
            { texto: "Não", resultado: "Atendimento adequado na atenção primária. Registrar e orientar retorno." }
        ]
    }
];

// CONTROLE
let indiceAtual = 0;

// MOSTRAR PERGUNTA
function mostrarPergunta(indice) {
    indiceAtual = indice;

    const perguntaDiv = document.getElementById("pergunta");
    const opcoesDiv = document.getElementById("opcoes");
    const resultadoDiv = document.getElementById("resultado");

    // Limpa o resultado quando houver
    resultadoDiv.style.display = "none";
    resultadoDiv.innerHTML = "";

    const item = fluxoTriagem[indice];
    perguntaDiv.innerHTML = item.pergunta;

    renderizarOpcoes(item.opcoes);
}

// MOSTRAR BOTÕES DE RESPOSTA
function renderizarOpcoes(opcoes) {
    const opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    opcoes.forEach(opcao => {
        const btn = document.createElement("button");
        btn.textContent = opcao.texto;
        btn.onclick = () => processarResposta(opcao);
        opcoesDiv.appendChild(btn);
    });
}

// PROCESSAR RESPOSTA
function processarResposta(opcao) {
    if (opcao.resultado) {
        exibirResultado(opcao.resultado);
        return;
    }

    if (opcao.proximo !== undefined) {
        mostrarPergunta(opcao.proximo);
        return;
    }

    console.error("Erro: Opção sem destino definido.", opcao);
}

// EXIBIR RESULTADO FINAL
function exibirResultado(texto) {
    const perguntaDiv = document.getElementById("pergunta");
    const opcoesDiv = document.getElementById("opcoes");
    const resultadoDiv = document.getElementById("resultado");

    perguntaDiv.innerHTML = "";
    opcoesDiv.innerHTML = "";

    resultadoDiv.innerHTML = texto;
    resultadoDiv.style.display = "block";
}

// INÍCIO DO FLUXO
mostrarPergunta(0);
