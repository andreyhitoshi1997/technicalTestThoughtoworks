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

    const prompt = `
Você é um engenheiro de QA com foco em automação. 
A seguir está um relatório de testes automatizados em JSON gerado com Playwright. 
Analise os resultados, identifique possíveis falsos positivos e sugira melhorias na automação:

${JSON.stringify(report, null, 2)}

Responda em português com sugestões técnicas objetivas.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
    });

    const result = response.choices[0].message.content;
    console.log('\n[🔍 INSIGHTS DA LLM]');
    console.log(result);

    const outputPath = path.resolve(__dirname, '../test-results/llm-analysis.txt');
    fs.writeFileSync(outputPath, result, 'utf-8');
  } catch (err) {
    console.error(`❌ Erro ao processar análise LLM: ${err.message}`);
    console.log(`ℹ️ Verifique se o arquivo JSON de testes foi gerado em: ${filePath}`);
  }
}

module.exports = {
  checkLLMFromJSONReport,
};
