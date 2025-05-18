import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const ExamResults = ({ results, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Résultats de l'examen</h2>
        <div className="mt-4">
          <span className="text-4xl font-bold text-blue-600">
            {results.score}/10
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {results.questions.map((question, index) => (
          <div
            key={question.id}
            className={`p-6 rounded-lg shadow ${
              question.correct ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {question.correct ? (
                  <CheckCircleIcon className="h-6 w-6 text-green-400" />
                ) : (
                  <XCircleIcon className="h-6 w-6 text-red-400" />
                )}
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Question {index + 1}
                  <span className="ml-2 text-sm text-gray-500">
                    ({question.points} point{question.points > 1 ? 's' : ''})
                  </span>
                </h3>
                {question.comment && (
                  <p className="mt-2 text-sm text-gray-700">{question.comment}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Nouvel examen
        </button>
      </div>
    </div>
  );
};

export default ExamResults; 