import { OpenAI } from "openai";
import { traceable } from "langsmith/traceable";
import { wrapOpenAI } from "langsmith/wrappers";

// Auto-trace LLM calls in-context
const client = wrapOpenAI(new OpenAI({}));
// Auto-trace this function
const pipeline = traceable(async (user_input) => {
  const result = await client.chat.completions.create({
    messages: [{ role: "user", content: user_input }],
    model: "tts-1",
  });
  return result.choices[0].message.content;
});

await pipeline("Hello, world!");
// Out: Hello there! How can I assist you today?