function mostrarCondicionais() {
    const q = document.getElementById("queixa").value;
    const area = document.getElementById("condicionais");

    area.innerHTML = "";

    // --- MAL ESTAR ---
    if (q === "malEstar") {
        area.innerHTML = `
            <label>Início súbito?</label>
            <select id="subitoMal">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
            
            <label>Acompanhado de suor frio?</label>
            <select id="suorFrioMal">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    // --- TONTURA ---
    if (q === "tontura") {
        area.innerHTML = `
            <label>Há quanto tempo?</label>
            <input id="tempoTontura" type="number">

            <label>Alteração visual?</label>
            <select id="visaoTontura">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    // --- DESMAIO ---
    if (q === "desmaio") {
        area.innerHTML = `
            <label>Teve perda de consciência?</label>
            <select id="pCons">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            <label>Bateu a cabeça?</label>
            <select id="bateuCabeca">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    // --- CONVULSÃO ---
    if (q === "convulsao") {
        area.innerHTML = `
            <label>Duração da crise (segundos)</label>
            <input id="duracaoConv" type="number">

            <label>Já apresentou crises antes?</label>
            <select id="historicoConv">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    // --- CEFALEIA ---
    if (q === "cefaleia") {
        area.innerHTML = `
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
        `;
    }

    // --- DOR TORÁCICA ---
    if (q === "dorToracica") {
        area.innerHTML = `
            <label>Irradiação para braço ou mandíbula?</label>
            <select id="irradiacao">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>
        `;
    }

    // --- OUTRO ---
    if (q === "outro") {
        area.innerHTML = `
            <label>Descreva a queixa:</label>
            <input id="queixaOutro" type="text" placeholder="Descrever...">
        `;
    }
}


// 🔥 SISTEMA DE ALERTAS EM TEMPO REAL
function validarSinais() {
    const t = parseFloat(document.getElementById("temperatura").value);
    const fc = parseInt(document.getElementById("fc").value);
    const fr = parseInt(document.getElementById("fr").value);
    const sp = parseInt(document.getElementById("spo2").value);
    const pas = parseInt(document.getElementById("pas").value);
    const pad = parseInt(document.getElementById("pad").value);

    const alertas = [];

    if (t >= 39) alertas.push("Temperatura muito alta");
    if (fc > 130) alertas.push("Taquicardia importante");
    if (fr > 30) alertas.push("Taquipneia");
    if (sp < 92) alertas.push("Hipoxemia");
    if (pas < 90) alertas.push("Hipotensão");

    return alertas;
}


// ⚠️ DETECÇÃO AUTOMÁTICA DE URGÊNCIA PARA "OUTRO"
function classificarOutro(descricao) {
    const palavrasUrgencia = [
        "dor no peito", "sangramento", "convulsão", "falta de ar",
        "inconsciência", "desmaio", "queda", "batida", "trauma",
        "parada", "crise", "alergia", "choque", "torácica"
    ];

    const texto = descricao.toLowerCase();

    for (let p of palavrasUrgencia) {
        if (texto.includes(p)) return true;
    }

    return false;
}


// 🎯 GERAÇÃO FINAL DO RESUMO
function gerarResumo() {
    const profissional = document.getElementById("profissional").value;
    const queixa = document.getElementById("queixa").value;

    let texto = "📋 RESUMO DA TRIAGEM\n\n";
    texto += `👤 Profissional: ${profissional}\n`;
    texto += `🩺 Queixa principal: ${queixa}\n`;

    // SE FOR "OUTRO", ANALISA AUTOMATICAMENTE
    if (queixa === "outro") {
        const desc = document.getElementById("queixaOutro").value;
        const urgente = classificarOutro(desc);

        texto += `Descrição: ${desc}\n`;
        texto += `Classificação automática: ${urgente ? "🚨 POSSÍVEL URGÊNCIA" : "🟢 Baixa probabilidade de urgência"}\n`;
    }

    const alertas = validarSinais();
    const alertaArea = document.getElementById("alertas");

    alertaArea.innerHTML = "";
    if (alertas.length > 0) {
        alertas.forEach(a => {
            alertaArea.innerHTML += `<div class="alerta">⚠️ ${a}</div>`;
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
