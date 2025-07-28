import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const HistoryDashboard = ({ userId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const q = query(collection(db, 'triage'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const sessionsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSessions(sessionsData);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [userId]);

  return (
    <div className="history-dashboard">
      <h2>{t('history.title')}</h2>
      {loading ? (
        <p>{t('history.loading')}</p>
      ) : sessions.length === 0 ? (
        <p>{t('history.empty')}</p>
      ) : (
        <div className="sessions-list">
          {sessions.map(session => (
            <div key={session.id} className="session-card">
              <h3>{new Date(session.createdAt?.toDate()).toLocaleString()}</h3>
              <p><strong>{t('history.symptoms')}:</strong> {session.originalText}</p>
              <div className="assessment-summary">
                <h4>{t('history.assessmentTitle')}</h4>
                <p><strong>{t('assessment.conditions')}:</strong></p>
                <ul>
                  {session.assessment?.conditions?.map((cond, i) => (
                    <li key={i}>
                      <strong>{cond.name}</strong>: {cond.description}
                    </li>
                  ))}
                </ul>
                <p><strong>{t('assessment.urgency')}:</strong> {session.assessment?.urgency?.level}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryDashboard;