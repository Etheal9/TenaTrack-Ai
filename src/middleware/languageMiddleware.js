import { detectLanguage, SUPPORTED_LANGUAGES } from '../utils/languageDetection';

const languageMiddleware = async (req, res, next) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text input is required' });
    }

    const detection = detectLanguage(text);
    
    if (!SUPPORTED_LANGUAGES.includes(detection.language)) {
      detection.language = 'en'; // Default to English if unsupported
    }

    req.language = detection.language;
    next();
  } catch (error) {
    console.error('Language middleware error:', error);
    return res.status(500).json({ error: 'Language processing failed' });
  }
};

export default languageMiddleware;