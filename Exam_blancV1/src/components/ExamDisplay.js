import React, { useState } from 'react';
import axios from 'axios';

const ExamDisplay = ({ examData, onExamSubmitted, setIsLoading, setError }) => {
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    const allQuestionsAnswered = examData.questions.every(
      question => answers[question.id] !== undefined && answers[question.id] !== ''
    );

    if (!allQuestionsAnswered) {
      setError('Veuillez répondre à toutes les questions');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://rested-asp-newly.ngrok-free.app/webhook/Correction',
        {
          exam_id: examData.exam_id,
          answers: Object.entries(answers).map(([question_id, answer]) => ({
            question_id,
            answer
          }))
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      onExamSubmitted(response.data);
    } catch (error) {
      setError('Erreur lors de la soumission de l\'examen. Veuillez réessayer.');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-2">
            {question.choices.map((choice, index) => (
              <label key={index} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={choice.split('.')[0]}
                  checked={answers[question.id] === choice.split('.')[0]}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700">{choice}</span>
              </label>
            ))}
          </div>
        );

      case 'open':
        return (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            maxLength={question.max_chars || 1000}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            rows="4"
            placeholder="Votre réponse..."
          />
        );

      default:
        return (
          <input
            type="text"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            placeholder="Votre réponse..."
          />
        );
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">{examData.title}</h2>
        {examData.time_limit && (
          <p className="mt-2 text-sm text-gray-500">
            Durée : {Math.floor(examData.time_limit / 60)} minutes
          </p>
        )}
      </div>

      <div className="space-y-6">
        {examData.questions.map((question, index) => (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">
                Question {index + 1}
                {question.points && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({question.points} point{question.points > 1 ? 's' : ''})
                  </span>
                )}
              </h3>
            </div>
            <p className="mt-2 text-gray-700">{question.text}</p>
            <div className="mt-4">
              {renderQuestion(question)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Soumettre l'examen
        </button>
      </div>
    </div>
  );
};

export default ExamDisplay; 