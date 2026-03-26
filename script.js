function mostrarCondicionais() {
    const q = document.getElementById("queixa").value;
    const area = document.getElementById("condicionais");

    area.innerHTML = "";

    const blocos = {
        malEstar: `
            <label>Início súbito?</label>
            <select id="subitoMal">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
            <label>Suor frio associado?</label>
            <select id="suorFrioMal">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        tontura: `
            <label>Duração (minutos)</label>
            <input id="tempoTontura" type="number">
            <label>Alteração visual?</label>
            <select id="visaoTontura">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        desmaio: `
            <label>Houve queda?</label>
            <select id="quedaDesmaio">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
            <label>Perda de consciência prolongada?</label>
            <select id="pCons">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        convulsao: `
            <label>Duração da crise (segundos)</label>
            <input id="duracaoConv" type="number">
            <label>Primeira crise?</label>
            <select id="primeiraConv">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        cefaleia: `
            <label>Início súbito?</label>
            <select id="subitoCef">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
            <label>Fotofobia?</label>
            <select id="fotoCef">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        dorToracica: `
            <label>Dor irradia para braço ou mandíbula?</label>
            <select id="irradiacao">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `,
        outro: `
            <label>Descreva a queixa:</label>
            <input id="queixaOutro" type="text">
        `
    };

    if (blocos[q]) area.innerHTML = blocos[q];
}

function validarSinais() {
    const t = parseFloat(document.getElementById("temperatura").value);
    const fc = parseInt(document.getElementById("fc").value);
    const fr = parseInt(document.getElementById("fr").value);
    const sp = parseInt(document.getElementById("spo2").value);
    const pas = parseInt(document.getElementById("pas").value);

    const alertas = [];

    if (t >= 39) alertas.push("Temperatura muito alta");
    if (fc > 130) alertas.push("Taquicardia importante");
    if (fr > 30) alertas.push("Taquipneia");
    if (sp < 92) alertas.push("Hipoxemia");
    if (pas < 90) alertas.push("Hipotensão");

    return alertas;
}

function classificarOutro(desc) {
    const urg = ["hemorragia", "sangue", "convuls", "dor no peito", "falta de ar", "trauma", "queda", "crise"];
    const texto = desc.toLowerCase();
    return urg.some(p => texto.includes(p));
}

function gerarResumo() {
    const prof = document.getElementById("profissional").value;
    const queixa = document.getElementById("queixa").value;
    const result = document.getElementById("resultado");

    let texto = `📋 RESUMO DA TRIAGEM\n\n👤 Profissional: ${prof}\n🩺 Queixa: ${queixa}\n`;

    if (queixa === "outro") {
        const desc = document.getElementById("queixaOutro").value;
        texto += `Descrição: ${desc}\n`;
        texto += `Classificação automática: ${classificarOutro(desc) ? "🚨 POSSÍVEL URGÊNCIA" : "🟢 Não parece urgência"}\n`;
    }

    const alertas = validarSinais();
    const alertaArea = document.getElementById("alertas");
    alertaArea.innerHTML = "";

    alertas.forEach(a => alertaArea.innerHTML += `<div class="alerta">⚠️ ${a}</div>`);

    texto += `\n📊 Sinais vitais:\n`;
    texto += `Temperatura: ${temperatura.value}°C\n`;
    texto += `FC: ${fc.value} bpm\n`;
    texto += `FR: ${fr.value} irpm\n`;
    texto += `SpO2: ${spo2.value}%\n`;
    texto += `PA: ${pas.value}/${pad.value} mmHg\n`;

    texto += `\n⚠️ Alertas clínicos: ${alertas.length ? alertas.join(", ") : "Nenhum"}`;

    result.innerText = texto;
}
