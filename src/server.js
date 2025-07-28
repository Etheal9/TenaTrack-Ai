import express from 'express';
import cors from 'cors';
import { db } from './config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import languageMiddleware from './middleware/languageMiddleware.js';
import { getTriageAssessment } from './services/geminiService.js';

const app = express();
app.use(cors());
app.use(express.json());

// API endpoint for symptom assessment
app.post('/api/triage', languageMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    const language = req.language;
    
    // Get assessment from Gemini
    const assessment = await getTriageAssessment(text, language);
    
    // Log to Firestore
    const sessionData = {
      userId: req.user?.id || 'anonymous',
      inputLanguage: language,
      originalText: text,
      assessment,
      createdAt: new Date()
    };
    
    const docRef = await addDoc(collection(db, 'triage'), sessionData);
    
    res.json({
      ...assessment,
      sessionId: docRef.id
    });
  } catch (error) {
    console.error('Triage error:', error);
    res.status(500).json({ error: 'Failed to process symptom assessment' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});