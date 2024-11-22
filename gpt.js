import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import pdf from "pdf-parse";
import { ChatOpenAI, PromptTemplate, LLMChain } from "langchain";

// Inisialisasi OpenAI melalui LangChain
const llm = new ChatOpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.LANGCHAIN_API_KEY,
});

// Template Prompt untuk mencocokkan CV dengan kriteria
const matchingPrompt = new PromptTemplate({
  inputVariables: ["cv_content", "requirement"],
  template: `
    Berikut adalah konten CV kandidat:
    {cv_content}

    Apakah kandidat ini memenuhi kriteria berikut?
    {requirement}
    
    Jawab dengan 'Ya' atau 'Tidak' dan berikan alasan singkat.
  `,
});

// Membaca file PDF
async function readPDF(filePath) {
  const buffer = fs.readFileSync(filePath);
  const data = await pdf(buffer);
  return data.text;
}

// Memproses CV
async function processCVs(cvFolder, requirement) {
  const files = fs.readdirSync(cvFolder);
  for (const file of files) {
    const filePath = `${cvFolder}/${file}`;
    console.log(`\n--- Memproses CV: ${file} ---`);
    const cvContent = await readPDF(filePath);

    // Jalankan LangChain untuk mengevaluasi CV
    const chain = new LLMChain({ llm, prompt: matchingPrompt });
    const response = await chain.call({ cv_content: cvContent, requirement });
    console.log("Hasil Evaluasi:", response.text);
  }
}

// Kriteria seleksi
const requirement = `
- Pengalaman kerja minimal 2 tahun.
- Menguasai Python dan SQL.
- Berpengalaman menggunakan Tableau atau Power BI.
`;

// Jalankan proses seleksi
processCVs("cv_files", requirement);
