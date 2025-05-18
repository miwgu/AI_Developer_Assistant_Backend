import { Ollama } from "langchain/llms/ollama";

const ollama = new Ollama({
  model: "tinyllama", // "mistral"
});

export async function getAIResponse(prompt: string): Promise<string> {
  const response = await ollama.call(prompt);
  return response;
}