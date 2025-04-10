const { config } = require('dotenv');
const fs = require('fs').promises;
const { OpenAI } = require('openai');
const path = require('path');

config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function parseJsonReport(filePath) {
    try {
        await fs.access(filePath); // Verifica se o arquivo existe
        const raw = await fs.readFile(filePath, 'utf-8');
        if (!raw.trim()) throw new Error('Arquivo JSON vazio');
        return JSON.parse(raw);
    } catch (err) {
        throw new Error(`Erro ao processar ${filePath}: ${err.message}`);
    }
}

async function checkLLMFromJSONReport() {
    const filePath = path.resolve(__dirname, '../test-results/last-run-playwright.json');
    const testResultsDir = path.resolve(__dirname, '../test-results');

    try {
        const report = await parseJsonReport(filePath);
        const readMeBusiness = await fs.readFile(path.resolve(__dirname, '../readme.md'), 'utf-8');
        const featureFile = await fs.readFile(path.resolve(__dirname, '../features/search.feature'), 'utf-8');
        const automationCode = await fs.readFile(path.resolve(__dirname, '../features/step_definitions/steps.js'), 'utf-8');
        const pageObject = await fs.readFile(path.resolve(__dirname, '../pages/MarsAirPage.js'), 'utf-8');
        const files = await fs.readdir(testResultsDir);

        const prompt = `
            Você é um engenheiro sênior de QA com foco em automação e testes auto recuperáveis (self-healing).
            A seguir estão:
            1. A minha estratégia de teste em formato markdown para você aprender os requisitos do negócio e aplicação
            2. O relatório de testes em JSON com Playwright.
            3. O código atual do step (steps.js).
            4. O código atual da page object (MarsAirPage.js).
            5. O arquivo feature usando Cucumber js (search.feature).

            Analise o relatório e proponha **melhorias específicas no código** para torná-lo mais resiliente, auto adaptável (self-healing) e evitar falsos positivos ou falhas intermitentes.

            ### Estratégia de teste 
            ${readMeBusiness}

            ### Relatório JSON testes:
            ${JSON.stringify(report, null, 2)}

            ### Código steps.js:
            ${automationCode}

            ### Código MarsAirPage.js:
            ${pageObject}

            ### Arquivo search.feature:
            ${featureFile}

            Retorne sugestões de mudança com base nas boas práticas, explicando o motivo de cada ajuste.
            Responda em português e, se possível, cite trechos de código com a melhoria aplicada.
        `;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'system', content: prompt }],
        });

        const result = response.choices[0].message.content;
        console.log('\n[🤖 SELF-HEALING SUGESTÕES]');
        console.log(result);

        await fs.writeFile(path.resolve(__dirname, '../test-results/llm-self-healing.txt'), result, 'utf-8');
    } catch (err) {
        console.error(`❌ Erro ao processar análise LLM: ${err.message}`);
    }
}

checkLLMFromJSONReport();