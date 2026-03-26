let vaga = null;

function definirVaga(v) {
    vaga = v;
    alert("Status da vaga registrado.");
}

function mostrarCondicionais() {
    const q = queixa.value;
    const box = document.getElementById("condicionais");
    box.innerHTML = "";

    const modelos = {
        convulsao: `
            <label>Duração da crise (segundos):</label>
            <input id="duracaoConv" type="number">

            <label>Primeira crise?</label>
            <select id="primeiraConv">
                <option value="">Selecione…</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            <label>Rebaixamento de consciência?</label>
            <select id="rebaixamento">
                <option value="">Selecione…</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        desmaio: `
            <label>Houve queda com TCE?</label>
            <select id="tceDesmaio"><option value="sim">Sim</option><option value="nao">Não</option></select>

            <label>Perda de consciência prolongada?</label>
            <select id="pCons"><option value="sim">Sim</option><option value="nao">Não</option></select>
        `,
        dorToracica: `
            <label>Irradiação para braço/mandíbula?</label>
            <select id="irradiacao"><option value="sim">Sim</option><option value="nao">Não</option></select>

            <label>Sudorese fria?</label>
            <select id="suor"><option value="sim">Sim</option><option value="nao">Não</option></select>
        `,
        outro: `
            <label>Descreva a queixa:</label>
            <input id="queixaOutro" type="text">
        `
    };

    if (modelos[q]) box.innerHTML = modelos[q];
}

function riscoQueixa() {
    const q = queixa.value;

    if (q === "convulsao") {
        if (rebaixamento?.value === "sim") return "emergencia";
        if (Number(duracaoConv?.value) > 30) return "urgencia";
        if (primeiraConv?.value === "sim") return "urgencia";
        return "acolhimento";
    }

    if (q === "hemorragia") return "emergencia";
    if (q === "dispneia") return "urgencia";

    if (q === "desmaio") {
        if (pCons?.value === "sim") return "urgencia";
        if (tceDesmaio?.value === "sim") return "urgencia";
        return "acolhimento";
    }

    if (q === "dorToracica") {
        if (irradiacao?.value === "sim") return "emergencia";
        if (suor?.value === "sim") return "urgencia";
        return "acolhimento";
    }

    if (q === "outro") {
        const txt = queixaOutro.value.toLowerCase();
        const risco = ["convuls", "dor no peito", "falta de ar", "sangr", "queda", "trauma", "rebaix"];
        return risco.some(a => txt.includes(a)) ? "urgencia" : "acolhimento";
    }

    return "acolhimento";
}

function riscoVitais() {
    const sp = Number(spo2.value || 100);
    const frN = Number(fr.value || 18);
    const pasN = Number(pas.value || 120);
    const fcN = Number(fc.value || 80);

    if (sp < 90) return "emergencia";
    if (pasN < 90) return "emergencia";
    if (frN > 30) return "urgencia";
    if (fcN > 150) return "urgencia";

    return null;
}

function gerarResumo() {
    const rQueixa = riscoQueixa();
    const rSV = riscoVitais();
    const risco = rSV || rQueixa;

    const box = document.getElementById("resultado");
    box.className = "resultado";

    let msg = "";

    if (risco === "emergencia") {
        box.classList.add("emergencia");
        msg = `🔴 EMERGÊNCIA
Atendimento imediato.

⚠ Coletar sinais vitais assim que clinicamente possível.`;
    }

    else if (risco === "urgencia") {
        box.classList.add("urgencia");
        msg = `🟠 URGÊNCIA
Atender mesmo sem vaga.

⚠ Coletar sinais vitais assim que possível.`;
    }

    else {
        if (vaga === true) {
            box.classList.add("acolhimento");
            msg = `🟡 ACOLHIMENTO
Paciente será atendido (há vaga).`;
        }
        else if (vaga === false) {
            box.classList.add("orientacao");
            msg = `🟢 Sem sinais de urgência.
Sem vaga no acolhimento.
Orientar paciente a retornar mais tarde ou buscar UPA.`;
        }
        else {
            box.classList.add("acolhimento");
            msg = `🟡 Necessário informar se há vaga no acolhimento.`;
        }
    }

    box.innerText = msg;
}
