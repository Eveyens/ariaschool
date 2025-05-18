import React, { useState } from 'react';
import './App.css';

// À MODIFIER selon ton URL n8n
const WEBHOOK_URL = 'https://rested-asp-newly.ngrok-free.app/webhook/flashcards';

const COURSES = [
  { value: '', label: 'Sélectionnez un cours' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Cybersécurité', label: 'Cybersécurité' },
  { value: 'Stratégie', label: 'Stratégie' },
  { value: 'Économie', label: 'Économie' },
];

function App() {
  const [course, setCourse] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!course) {
      alert('Veuillez sélectionner un cours');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_id: course })
      });
      if (!response.ok) throw new Error('Erreur lors de la génération des cartes');
      const data = await response.json();
      setFlashcards(data.cards || []);
    } catch (error) {
      alert('Une erreur est survenue lors de la génération des cartes');
      setFlashcards([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <a href="/" style={{
        display: 'inline-block',
        margin: '1rem',
        padding: '0.5rem 1rem',
        background: '#007bff',
        color: 'white',
        borderRadius: '4px',
        textDecoration: 'none'
      }}>Accueil</a>
      <h1>Flash Cards</h1>
      <div className="course-selection">
        <select
          value={course}
          onChange={e => setCourse(e.target.value)}
          id="courseSelect"
        >
          {COURSES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <button id="generateBtn" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Chargement...' : 'Générer'}
        </button>
      </div>
      <div id="flashcards-container" className="flashcards-grid">
        {flashcards.map((card, idx) => (
          <Flashcard key={idx} question={card.question} answer={card.answer} />
        ))}
      </div>
    </div>
  );
}

function Flashcard({ question, answer }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`flashcard${flipped ? ' flipped' : ''}`} onClick={() => setFlipped(f => !f)}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="flashcard-content">{question}</div>
        </div>
        <div className="flashcard-back">
          <div className="flashcard-content">{answer}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
