function mostrarCondicionais() {
    const q = document.getElementById("queixa").value;
    const area = document.getElementById("condicionais");

    area.innerHTML = "";

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

    if (q === "dispneia") {
        area.innerHTML = `
            <label>Início súbito?</label>
            <select id="subitoDisp">
                <option value="">Selecione...</option>
                <option value="sim">Sim</option>
                <option value="nao">Não</option>
            </select>

            <label>Dor torácica associada?</label>
            <select id="dorToracicaDisp">
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

    if (q === "outro") {
        area.innerHTML = `
            <label>Descreva a queixa:</label>
            <input id="queixaOutro" type="text" placeholder="Descrever...">
        `;
    }
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

function classificarOutro(descricao) {
    const palavrasUrg = [
        "dor no peito", "sangramento", "convulsão", "falta de ar",
        "inconsciência", "desmaio", "queda", "batida", "trauma",
        "parada", "crise", "alergia", "choque", "torácica"
    ];

    const texto = descricao.toLowerCase();

    for (let p of palavrasUrg) {
        if (texto.includes(p)) return true;
    }

    return false;
}

function gerarResumo() {
    const profissional = document.getElementById("profissional").value;
    const queixa = document.getElementById("queixa").value;

    let texto = "📋 RESUMO DA TRIAGEM\n\n";
    texto += `👤 Profissional: ${profissional}\n`;
    texto += `🩺 Queixa principal: ${queixa}\n`;

    if (queixa === "outro") {
        const desc = document.getElementById("queixaOutro").value;
        const urgente = classificarOutro(desc);
        texto += `Descrição: ${desc}\n`;
        texto += `Classificação automática: ${urgente ? "🚨 POSSÍVEL URGÊNCIA" : "🟢 Pouco sugestivo de urgência"}\n`;
    }

    const alertas = validarSinais();
    const alertaArea = document.getElementById("alertas");
    alertaArea.innerHTML = "";

    if (alertas.length > 0) {
        alertas.forEach(a => {
            alertaArea.innerHTML += `<div class="alerta">⚠️ ${a}</div>`;
        });
    }

    texto += "\n📊 Sinais vitais:\n";
    texto += `Temperatura: ${document.getElementById("temperatura").value}°C\n`;
    texto += `FC: ${document.getElementById("fc").value} bpm\n`;
    texto += `FR: ${document.getElementById("fr").value} irpm\n`;
    texto += `SpO2: ${document.getElementById("spo2").value}%\n`;
    texto += `PA: ${document.getElementById("pas").value}/${document.getElementById("pad").value} mmHg\n`;

    texto += `\n⚠️ Alertas clínicos: ${alertas.length > 0 ? alertas.join(", ") : "Nenhum"}`;

    document.getElementById("resultado").innerText = texto;
}
