import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDE_gVSLJkZvMxeFrCxY_7IBCV1TTfKqXM';
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export const getTriageAssessment = async (symptoms, language = 'en') => {
  try {
    const prompt = `
    You are a medical triage assistant analyzing symptoms in ${language}.
    For the symptoms: "${symptoms}"
    
    Provide a detailed assessment including:
    1. Possible conditions (list top 3 with brief descriptions)
    2. Recommended actions (prioritized list)
    3. Urgency level (low/medium/high with explanation)
    4. When to seek immediate medical help
    5. Self-care recommendations if applicable
    
    Structure the response as JSON with these keys:
    {
      "conditions": [{"name": string, "description": string}],
      "actions": string[],
      "urgency": {"level": string, "reason": string},
      "seekHelp": string,
      "selfCare": string,
      "language": "${language}"
    }
    
    Use clear, compassionate language appropriate for ${language} speakers.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate triage assessment');
  }
};

export default {
  getTriageAssessment
};