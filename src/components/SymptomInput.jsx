import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslations } from '../hooks/useTranslations';

const SymptomInput = () => {
  const { t } = useTranslations();
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (window.webkitSpeechRecognition || window.SpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + ' ' + transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
      };

      setRecognition(recognition);
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('/api/triage', { text: input });
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'Failed to get assessment' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="symptom-input">
      <h2>{t('symptomInput.title')}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('symptomInput.placeholder')}
          rows={5}
        />
        <div className="input-controls">
          <button
            type="button"
            onClick={toggleRecording}
            className={isRecording ? 'recording' : ''}
          >
            {isRecording ? t('symptomInput.voiceButtonStop') : t('symptomInput.voiceButton')}
          </button>
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? t('symptomInput.analyzing') : t('symptomInput.submitButton')}
          </button>
        </div>
      </form>

      {response && (
        <div className="response">
          <h3>{t('assessment.title')}</h3>
          {response.error ? (
            <p className="error">{t('assessment.error')}</p>
          ) : (
            <>
              <h4>{t('assessment.conditions')}</h4>
              <ul>
                {response.conditions?.map((cond, i) => (
                  <li key={i}>{cond}</li>
                ))}
              </ul>
              <p><strong>{t('assessment.urgency')}:</strong> {response.urgency}</p>
              <h4>{t('assessment.actions')}</h4>
              <p>{response.actions}</p>
              <h4>{t('assessment.seekHelp')}</h4>
              <p>{response.seekHelp}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SymptomInput;