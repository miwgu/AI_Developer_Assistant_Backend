import { Ollama } from "langchain/llms/ollama";

const ollama = new Ollama({
  model: "tinyllama", // "mistral"
});

export async function* getAIResponseStream(prompt: string): AsyncGenerator<string> {
  const stream = await ollama.stream(prompt);
  for await (const chunk of stream) {
    yield chunk;
  }
}