const weeklyFeedbackData = [
    {
        name: "Budi",
        week: 1,
        feedback: "Kurang inisiatif dalam menyelesaikan tugas."
    },
    {
        name: "Budi",
        week: 2,
        feedback: "Ada peningkatan, tetapi masih terlambat beberapa kali."
    },
    {
        name: "Siti",
        week: 1,
        feedback: "Sangat rajin dan tepat waktu."
    },
    {
        name: "Siti",
        week: 2,
        feedback: "Tetap konsisten menyelesaikan tugas dengan baik."
    }
];

import { PromptTemplate } from "langchain/prompts";

const weeklySentimentPrompt = new PromptTemplate({
    template: `
    Analisis sentimen dari ulasan berikut:
    "{feedback}"
    Apakah sentimen ini positif, netral, atau negatif? Berikan alasan singkat.
    Tambahkan skor sentimen (misalnya, 1 = negatif, 3 = netral, 5 = positif).`,
    inputVariables: ["feedback"]
  });

  const analyzeWeeklyFeedback = async (feedbackData) => {
    const chain = new LLMChain({ llm: model, prompt: weeklySentimentPrompt });
  
    for (const feedback of feedbackData) {
      const sentimentResult = await chain.call({ feedback: feedback.feedback });
      console.log(`Week ${feedback.week} - ${feedback.name}: ${sentimentResult}`);
    }
  };
  
  analyzeWeeklyFeedback(weeklyFeedbackData);
  
  


