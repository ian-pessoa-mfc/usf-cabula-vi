document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            alert("Mensagem enviada com sucesso!");
        });
    }
});
// --- Assistente de Triagem Interativa ---

const fluxoTriagem = [
    {
        pergunta: "O paciente apresenta SINAIS VITAIS CRÍTICOS? (ex.: FR<10 ou >30, FC<40 ou >140, PAS<90, SpO2<90%)",
        opcoes: [
            { texto: "Sim", destino: "emergencia" },
            { texto: "Não", destino: 1 }
        ]
    },
    {
        pergunta: "O paciente apresenta QUEIXAS AGUDAS GRAVES? (dor intensa, falta de ar importante, sangramento ativo, convulsões)",
        opcoes: [
            { texto: "Sim", destino: "urgencia" },
            { texto: "Não", destino: 2 }
        ]
    },
    {
        pergunta: "O serviço necessário está DISPONÍVEL na USF Cabula VI?",
        opcoes: [
            { texto: "Sim", destino: "normal" },
            { texto: "Não", destino: 3 }
        ]
    },
    {
        pergunta: "Aplica-se algum critério para REFERÊNCIA? (trauma, gestante alto risco, suspeita AVC/infarto, dor torácica, etc.)",
        opcoes: [
            { texto: "Sim", destino: "referencia" },
            { texto: "Não", destino: "retorno" }
        ]
    }
];

function iniciarTriagem() {
    const perguntaDiv = document.getElementById("pergunta");
    const opcoesDiv = document.getElementById("opcoes");
    const resultadoDiv = document.getElementById("resultado");

    if (!perguntaDiv) return;

    let passo = 0;

    function mostrarPasso() {
        const etapa = fluxoTriagem[passo];
        perguntaDiv.innerHTML = "<h3>" + etapa.pergunta + "</h3>";
        opcoesDiv.innerHTML = "";

        etapa.opcoes.forEach(op => {
            const btn = document.createElement("button");
            btn.textContent = op.texto;
            btn.style.margin = "10px";
            btn.onclick = () => {
                if (typeof op.destino === "number") {
                    passo = op.destino;
                    mostrarPasso();
                } else {
                    mostrarResultado(op.destino);
                }
            };
            opcoesDiv.appendChild(btn);
        });
    }

    function mostrarResultado(tipo) {
        opcoesDiv.innerHTML = "";
        perguntaDiv.innerHTML = "";

        const textos = {
            emergencia: "🔴 TRIAGEM: EMERGÊNCIA — Atendimento imediato na USF ou SAMU.",
            urgencia: "🟠 TRIAGEM: URGÊNCIA — Atendimento prioritário na USF.",
            normal: "🟢 TRIAGEM: ATENDIMENTO NORMAL — Encaminhar para consulta conforme fluxo.",
            referencia: "🔵 TRIAGEM: REFERÊNCIA — Encaminhar paciente para unidade de maior complexidade.",
            retorno: "🟡 TRIAGEM: RETORNO PROGRAMADO — Orientar vir em outra data ou agendar acompanhamento."
        };

        resultadoDiv.innerHTML = textos[tipo];
    }

    mostrarPasso();
}

document.addEventListener("DOMContentLoaded", iniciarTriagem);
