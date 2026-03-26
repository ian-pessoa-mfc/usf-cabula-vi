function mostrarCondicionais() {
    const q = document.getElementById("queixa").value;
    const area = document.getElementById("condicionais");

    area.innerHTML = "";

    if (q === "febre") {
        area.innerHTML = `
            <label>Há quantos dias?</label>
            <input id="diasFebre" type="number">

            <label>Tomou antitérmico?</label>
            <select id="antitermico">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    if (q === "dispneia") {
        area.innerHTML = `
            <label>Início súbito?</label>
            <select id="subito">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            <label>Dor torácica associada?</label>
            <select id="dorToracica">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    if (q === "vomito") {
        area.innerHTML = `
            <label>Quantidade de episódios?</label>
            <input id="episodiosVomito" type="number">

            <label>Há sinais de desidratação?</label>
            <select id="desidratacaoVomito">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    if (q === "diarreia") {
        area.innerHTML = `
            <label>Duração (dias)</label>
            <input id="duracaoDiarreia" type="number">

            <label>Muco ou sangue?</label>
            <select id="mucoSangue">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    if (q === "dor") {
        area.innerHTML = `
            <label>Local da dor</label>
            <input id="localDor" type="text">

            <label>Intensidade (0 a 10)</label>
            <input id="intensidadeDor" type="number" min="0" max="10">
        `;
    }
}

function validarSinais() {
    const t = parseFloat(document.getElementById("temperatura").value);
    const fc = parseInt(document.getElementById("fc").value);
    const fr = parseInt(document.getElementById("fr").value);
    const sp = parseInt(document.getElementById("spo2").value);
    const pas = parseInt(document.getElementById("pas").value);
    const pad = parseInt(document.getElementById("pad").value);

    const alertas = [];

    if (t >= 39) alertas.push("⚠️ Temperatura muito alta");
    if (fc > 130) alertas.push("⚠️ Taquicardia importante");
    if (fr > 30) alertas.push("⚠️ Taquipneia");
    if (sp < 92) alertas.push("⚠️ Hipoxemia");
    if (pas < 90) alertas.push("⚠️ Hipotensão");

    return alertas;
}

function gerarResumo() {
    const profissional = document.getElementById("profissional").value;
    const queixa = document.getElementById("queixa").value;

    let texto = "📋 RESUMO DA TRIAGEM\n\n";
    texto += `👤 Profissional: ${profissional}\n`;
    texto += `🩺 Queixa principal: ${queixa}\n`;

    const alertas = validarSinais();
    const alertaArea = document.getElementById("alertas");

    alertaArea.innerHTML = "";
    if (alertas.length > 0) {
        alertas.forEach(a => {
            alertaArea.innerHTML += `<div class="alerta">${a}</div>`;
        });
    }

    const t = document.getElementById("temperatura").value;
    const fc = document.getElementById("fc").value;
    const fr = document.getElementById("fr").value;
    const sp = document.getElementById("spo2").value;
    const pas = document.getElementById("pas").value;
    const pad = document.getElementById("pad").value;

    texto += `\n📊 Sinais vitais:\n`;
    texto += `Temperatura: ${t}°C\n`;
    texto += `FC: ${fc} bpm\n`;
    texto += `FR: ${fr} irpm\n`;
    texto += `SpO2: ${sp}%\n`;
    texto += `PA: ${pas}/${pad} mmHg\n`;

    texto += `\n⚠️ Alertas clínicos: ${alertas.length > 0 ? alertas.join(", ") : "Nenhum"}\n`;

    document.getElementById("resultado").innerText = texto;
}
