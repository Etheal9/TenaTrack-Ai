import * as languageDetector from 'language-detector';

export const detectLanguage = (text) => {
  try {
    const result = languageDetector.detect(text);
    return {
      language: result.language,
      confidence: result.confidence,
      isReliable: result.confidence > 0.8
    };
  } catch (error) {
    console.error('Language detection failed:', error);
    return {
      language: 'en',
      confidence: 0,
      isReliable: false
    };
  }
};

export const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ru', 'zh', 'ja', 'ar'];