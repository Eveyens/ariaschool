import React, { useState } from 'react';
import ExamGenerator from './components/ExamGenerator';
import ExamDisplay from './components/ExamDisplay';
import ExamResults from './components/ExamResults';

function App() {
  const [examData, setExamData] = useState(null);
  const [examResults, setExamResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExamGenerated = (data) => {
    setExamData(data);
    setExamResults(null);
    setError(null);
  };

  const handleExamSubmitted = (results) => {
    setExamResults(results);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <a href="/" style={{
                  display: 'inline-block',
                  marginBottom: '1rem',
                  padding: '0.5rem 1rem',
                  background: '#007bff',
                  color: 'white',
                  borderRadius: '4px',
                  textDecoration: 'none'
                }}>Accueil</a>
                <h1 className="text-3xl font-bold text-center mb-8">Examen Blanc</h1>
                
                {!examData && (
                  <ExamGenerator 
                    onExamGenerated={handleExamGenerated}
                    setIsLoading={setIsLoading}
                    setError={setError}
                  />
                )}

                {examData && !examResults && (
                  <ExamDisplay 
                    examData={examData}
                    onExamSubmitted={handleExamSubmitted}
                    setIsLoading={setIsLoading}
                    setError={setError}
                  />
                )}

                {examResults && (
                  <ExamResults 
                    results={examResults}
                    onReset={() => {
                      setExamData(null);
                      setExamResults(null);
                    }}
                  />
                )}

                {isLoading && (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4">Chargement en cours...</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Erreur : </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 