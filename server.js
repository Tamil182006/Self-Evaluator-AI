import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

app.post('/api/evaluate', async (req, res) => {
  const { intro } = req.body;
 const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an expert communication evaluator. A student has provided a self-introduction for a placement interview.
Evaluate it by giving:
1. A rating out of 10
2. Strengths
3. Weaknesses
4. Actionable tips to improve

Self-Introduction:
"""
${intro}
"""
Return your answer in clear bullet points format.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    res.json({ result: text });
  } catch (error) {
    console.error('❌ Gemini API Error (backend):', error);
    res.status(500).json({ error: 'Gemini API failed', detail: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
