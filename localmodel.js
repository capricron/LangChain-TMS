
import { Ollama } from "@langchain/ollama";

const llm = new Ollama({
  model: "llama3.2", // Default value
  temperature: 0,
  maxRetries: 2,
  // other params...
});

const inputText = "Hai apakah kamu mengerti bahasa ku?";

const completion = await llm.invoke(inputText);

console.log('====================================');
console.log(completion);
console.log('====================================');