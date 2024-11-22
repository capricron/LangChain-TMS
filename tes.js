import { ChatOpenAI } from "@langchain/openai";
import { config } from "dotenv";

config()

const model = new ChatOpenAI({ 
  apiKey: ""
 });

import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const messages = [
  new SystemMessage("Translate the following from English into Italian"),
  new HumanMessage("hi!"),
];

await model.invoke(messages);