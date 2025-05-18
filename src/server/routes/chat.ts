import { Router, Request, Response } from 'express';
import { getAIResponseStream } from '../llm/ollama';

const router = Router();

interface ChatRequestBody {
  message: string;
}

router.post('/query', async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
 
  try {
    for await (const token of getAIResponseStream(message)) {
      res.write(token);
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).end('Error streaming response');
  }
});

export default router;

