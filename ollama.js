const employees = [
    {
        name: "Budi",
        position: "Magang",
        feedback: [
            { week: 1, feedback: "Proaktif dan rajin" },
            { week: 2, feedback: "Tepat waktu, kerja cepat" },
            { week: 3, feedback: "Komunikasi efektif" },
            { week: 4, feedback: "Sangat konsisten" }
        ]
    },
    // {
    //     name: "Santoso",
    //     position: "Kontrak",
    //     feedback: [
    //         { week: 1, feedback: "Cukup baik, namun sering terlambat" },
    //         { week: 2, feedback: "Cukup baik, kurang inisiatif" },
    //         { week: 3, feedback: "Tidak menyelesaikan tugas tepat waktu" },
    //         { week: 4, feedback: "Tugas selesai, namun lambat" }
    //     ]
    // },
    // {
    //     name: "Caca",
    //     position: "Fulltime",
    //     feedback: [
    //         { week: 1, feedback: "Tidak hadir tanpa alasan" },
    //         { week: 2, feedback: "Proyek tertunda" },
    //         { week: 3, feedback: "Tidak ada perkembangan" },
    //         { week: 4, feedback: "Performa buruk" }
    //     ]
    // }
];


import { Ollama } from "@langchain/ollama";
import { LLMChain } from "langchain/chains";

// Konfigurasi Ollama
const model = new Ollama({
    baseUrl: "http://localhost:11434", // URL server Ollama
    model: "llama3.2" // Model yang digunakan
});

const analyzeSentiment = async (feedback) => {
    // Prompt langsung untuk analisis sentimen
    const prompt = `
    Berikut adalah ulasan karyawan: "${feedback}"
    
    Analisis ulasan ini dan berikan:
    - Sentimen: Positif, Netral, atau Negatif.
    - Skor: 5 untuk Positif, 3 untuk Netral, 1 untuk Negatif.

    Berikan langsung saja to the point berapa score nya, contoh
    Sentimen: Positif, Skor: 5

    Tidak usah diberikan penjelasanya cukup to the point saja
    `;

    try {
        // Memanggil model Ollama secara langsung
        const result = await model.call(prompt);
        return result; // Mengembalikan hasil teks dari model
    } catch (error) {
        console.error("Error analyzing sentiment:", error);
        return null;
    }
};

const testSentimentAnalysis = async () => {
    for (const employee of employees) {
        console.log(`Analisis Sentimen untuk ${employee.name}:`);
        for (const feedbackItem of employee.feedback) {
            const sentimentResult = await analyzeSentiment(feedbackItem.feedback);
            // console.log(`- Feedback: "${feedbackItem.feedback}"`);
            console.log(`Hasil Sentimen: ${sentimentResult}`);
        }
    }
};

// testSentimentAnalysis();

const processFeedback = async (employee) => {
    let totalScore = 0; // Total skor feedback

    for (const feedbackItem of employee.feedback) {
        const sentimentResult = await analyzeSentiment(feedbackItem.feedback);

        // Parsing hasil sentimen (untuk memastikan format konsisten)
        const sentimentMatch = sentimentResult.match(/Sentimen: (\w+), Skor: (\d)/);
        const sentiment = sentimentMatch ? sentimentMatch[1] : "Netral";
        const score = sentimentMatch ? parseInt(sentimentMatch[2]) : 3;

        // Menambahkan hasil analisis ke objek feedback
        feedbackItem.sentiment = sentiment;
        feedbackItem.score = score;

        totalScore += score; // Menambahkan skor ke total
    }

    // Hitung rata-rata skor
    const averageScore = totalScore / employee.feedback.length;
    employee.averageScore = averageScore; // Simpan rata-rata skor ke objek karyawan
};

const evaluateEmployees = async (employees) => {
    for (const employee of employees) {
        console.log(`\nEvaluasi untuk ${employee.name}:`);
        await processFeedback(employee); // Proses analisis sentimen untuk setiap feedback

        // Cetak hasil setiap feedback
        employee.feedback.forEach((feedbackItem, index) => {
            console.log(`- Minggu ${index + 1}:`);
            console.log(`  Feedback: "${feedbackItem.feedback}"`);
            console.log(`  Sentimen: ${feedbackItem.sentiment}`);
            console.log(`  Skor: ${feedbackItem.score}`);
        });

        // Cetak rata-rata skor
        console.log(`Rata-rata Skor: ${employee.averageScore.toFixed(2)}`);
        console.log("------------------------------------------------");
    }
};

evaluateEmployees(employees);
