import { Router, Request, Response } from 'express';
import { getAIResponse } from '../llm/ollama';

const router = Router();

interface ChatRequestBody {
  message: string;
}

router.post('/chat', async (req: Request<{}, {}, ChatRequestBody>, res: Response) => {
  const { message } = req.body;

    if (!message) {
    return res.status(400).json({ error: "Message is required" });
  } 
 
  try {
    const aiResponse= await getAIResponse(message);
    res.json({ reply: aiResponse });
  } catch (error) {
    res.status(500).json({ error: 'AI processing failed' });
  }
});

export default router;

