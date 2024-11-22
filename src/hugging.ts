import {HuggingFaceInference} from "@langchain/llms"

const model = new HuggingFaceInference({
  model: "gpt2", // Anda bisa menggunakan model lainnya yang tersedia
  apiKey: "YOUR_HUGGINGFACE_API_KEY", // Jika Anda menggunakan model dari Hugging Face, API key diperlukan
});

const output = await model.call("Hello, what is the weather today?");
console.log(output);
