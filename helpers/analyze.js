const { config } = require('dotenv');
const fs = require('fs');
const { OpenAI } = require('openai');
const path = require('path');

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function parseJsonReport(filePath) {
    if (!fs.existsSync(filePath)) {
    throw new Error(`Arquivo não encontrado: ${filePath}`);
}

const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
}

async function checkLLMFromJSONReport() {
const filePath = path.resolve(__dirname, '../test-results/last-run.json');

try {
    const report = await parseJsonReport(filePath);

    const automationCode = fs.readFileSync(path.resolve(__dirname, '../features/step_definitions/steps.js'), 'utf-8');
    const pageObject = fs.readFileSync(path.resolve(__dirname, '../pages/MarsAirPage.js'), 'utf-8');

    const prompt = `
        Você é um engenheiro sênior de QA com foco em automação e testes auto recuperáveis (self-healing).
        A seguir estão:
        1. O relatório de testes em JSON com Playwright.
        2. O código atual do step (steps.js).
        3. O código atual da page object (MarsAirPage.js).

        Analise o relatório e proponha **melhorias específicas no código** para torná-lo mais resiliente, auto adaptável (self-healing) e evitar falsos positivos ou falhas intermitentes.

        ### Relatório JSON:
        ${JSON.stringify(report, null, 2)}

        ### Código steps.js:
        ${automationCode}

        ### Código MarsAirPage.js:
        ${pageObject}

        Retorne sugestões de mudança com base nas boas práticas, explicando o motivo de cada ajuste.
        Responda em português e, se possível, cite trechos de código com a melhoria aplicada.
        `;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
    });

    const result = response.choices[0].message.content;
    console.log('\n[🤖 SELF-HEALING SUGESTÕES]');
    console.log(result);

    fs.writeFileSync(path.resolve(__dirname, '../test-results/llm-self-healing.txt'), result, 'utf-8');
} catch (err) {
    console.error(`❌ Erro ao processar análise LLM: ${err.message}`);
}
}

checkLLMFromJSONReport();
