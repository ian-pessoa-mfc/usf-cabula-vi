let vagaAcolhimento = null;

function definirVaga(valor) {
    vagaAcolhimento = valor;
    alert("Vaga registrada: " + (valor ? "SIM" : "NÃO"));
}

function mostrarCondicionais() {
    const q = queixa.value;
    const box = document.getElementById("condicionais");
    box.innerHTML = "";

    const modelos = {
        convulsao: `
            <label>Duração da crise (em segundos):</label>
            <input id="duracaoConv" type="number">

            <label>Primeira crise?</label>
            <select id="primeiraConv">
                <option value="">Selecione…</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            <label>Está rebaixado?</label>
            <select id="rebaixamento">
                <option value="">Selecione…</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        desmaio: `
            <label>Houve queda com TCE?</label>
            <select id="tceDesmaio">
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            <label>Perda de consciência prolongada?</label>
            <select id="pCons">
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        dorToracica: `
            <label>Irradia para braço ou mandíbula?</label>
            <select id="irradiacao">
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            <label>Sudorese fria?</label>
            <select id="suor">
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        dispneia: `
            <label>Início súbito?</label>
            <select id="subitoDisp">
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        outro: `
            <label>Descreva a queixa:</label>
            <input id="queixaOutro" type="text">
        `
    };

    if (modelos[q]) box.innerHTML = modelos[q];
}

function avaliarQueixa() {
    const q = queixa.value;

    if (q === "convulsao") {
        const dur = Number(document.getElementById("duracaoConv").value || 0);
        const primeira = document.getElementById("primeiraConv").value;
        const rebaixado = document.getElementById("rebaixamento").value;

        if (rebaixado === "sim") return "emergencia";
        if (dur > 30) return "urgencia";
        if (primeira === "sim") return "urgencia";
        return "acolhimento";
    }

    if (q === "desmaio") {
        const tce = document.getElementById("tceDesmaio").value;
        const longa = document.getElementById("pCons").value;

        if (longa === "sim") return "urgencia";
        if (tce === "sim") return "urgencia";
        return "acolhimento";
    }

    if (q === "dorToracica") {
        const irr = document.getElementById("irradiacao").value;
        const suor = document.getElementById("suor").value;

        if (irr === "sim") return "emergencia";
        if (suor === "sim") return "urgencia";
        return "acolhimento";
    }

    if (q === "dispneia") return "urgencia";

    if (q === "hemorragia") return "emergencia";

    if (q === "outro") {
        const txt = document.getElementById("queixaOutro").value.toLowerCase();
        const alertas = ["falta de ar", "sangr", "dor no peito", "trauma", "convuls", "queda", "rebaix"];
        return alertas.some(a => txt.includes(a))
            ? "urgencia"
            : "acolhimento";
    }

    return "acolhimento";
}

function avaliarSinaisVitais() {
    const sp = Number(spo2.value || 100);
    const pas = Number(pas.value || 120);
    const fcNum = Number(fc.value || 80);
    const frNum = Number(fr.value || 18);

    if (sp < 90) return "emergencia";
    if (pas < 90) return "emergencia";
    if (fcNum > 150) return "urgencia";
    if (frNum > 30) return "urgencia";
    return null;
}

function gerarResumo() {
    const profissional = profissional.value;
    let riscoQueixa = avaliarQueixa();
    let riscoSV = avaliarSinaisVitais();

    let riscoFinal = riscoSV || riscoQueixa;

    let mensagem = "";

    if (riscoFinal === "emergencia") {
        mensagem = `
🔴 EMERGÊNCIA
Atendimento imediato, independente de vaga.
        `;
    } else if (riscoFinal === "urgencia") {
        mensagem = `
🟠 URGÊNCIA
Atender mesmo sem vaga no acolhimento.
        `;
    } else if (riscoFinal === "acolhimento") {
        if (vagaAcolhimento === true) {
            mensagem = `
🟡 Acolhimento
Paciente será atendido (há vaga disponível).
            `;
        } else if (vagaAcolhimento === false) {
            mensagem = `
🟡 Sem sinais de urgência.
Sem vaga no acolhimento.
Orientar paciente a retornar mais tarde ou buscar UPA.
            `;
        } else {
            mensagem = `
🟡 Acolhimento
Definir antes se há vaga no acolhimento.
            `;
        }
    }

    resultado.innerText = `Profissional: ${profissional}\n\n${mensagem}`;
}
