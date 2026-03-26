// SISTEMA DE TRIAGEM — VERSÃO ESTÁVEL E FUNCIONAL

const fluxoTriagem = [
    {
        pergunta: "O paciente apresenta SINAIS VITAIS CRÍTICOS? (FR<10 ou >30, FC<40 ou >140, PAS<90, SpO2<90%)",
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
            { texto: "Sim", resultado: "Atendimento normal. Direcionar para o acolhimento." },
            { texto: "Não", proximo: 3 }
        ]
    },

    {
        pergunta: "Há necessidade de encaminhamento para UPA, emergência ou especialidade?",
        opcoes: [
            { texto: "Sim", resultado: "Encaminhamento necessário. Orientar sobre sinais de alerta." },
            { texto: "Não", resultado: "Atendimento adequado na Atenção Primária. Registrar no prontuário." }
        ]
    }
];

function mostrarPergunta(i) {
    const item = fluxoTriagem[i];
    document.getElementById("pergunta").innerHTML = item.pergunta;

    const opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";

    item.opcoes.forEach(op => {
        const b = document.createElement("button");
        b.textContent = op.texto;
        b.onclick = () => processar(op);
        opcoesDiv.appendChild(b);
    });

    document.getElementById("resultado").style.display = "none";
}

function processar(opcao) {
    if (opcao.resultado) {
        const r = document.getElementById("resultado");
        r.innerHTML = opcao.resultado;
        r.style.display = "block";

        document.getElementById("pergunta").innerHTML = "";
        document.getElementById("opcoes").innerHTML = "";
        return;
    }

    mostrarPergunta(opcao.proximo);
}

// Iniciar fluxo
mostrarPergunta(0);
