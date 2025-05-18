import React, { useState } from 'react';
import axios from 'axios';

const ExamGenerator = ({ onExamGenerated, setIsLoading, setError }) => {
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = [
    { id: 'Marketing', name: 'Marketing' },
    { id: 'Finance', name: 'Finance' },
    { id: 'Cybersécurité', name: 'Cybersécurité' },
    { id: 'Stratégie', name: 'Stratégie' },
    { id: 'Économie', name: 'Économie' },
  ];

  const handleGenerateExam = async () => {
    if (!selectedCourse) {
      setError('Veuillez sélectionner un cours');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://rested-asp-newly.ngrok-free.app/webhook/Exams',
        { course_id: selectedCourse },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      onExamGenerated(response.data);
    } catch (error) {
      setError('Erreur lors de la génération de l\'examen. Veuillez réessayer.');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="course" className="block text-sm font-medium text-gray-700">
          Sélectionnez un cours
        </label>
        <select
          id="course"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Choisir un cours</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleGenerateExam}
        disabled={!selectedCourse}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
          ${!selectedCourse 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          }`}
      >
        Générer l'examen
      </button>
    </div>
  );
};

export default ExamGenerator; 