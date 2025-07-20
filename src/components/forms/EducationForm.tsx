import React, { useState } from 'react';
import { Plus, Edit, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { usePortfolio } from '../../context/PortfolioContext';
import { Education } from '../../types/portfolio';

export function EducationForm() {
  const { state, dispatch } = usePortfolio();
  const { education } = state.portfolioData;
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    degree: '',
    institute: '',
    duration: '',
    description: ''
  });

  const handleSubmit = () => {
    if (formData.degree && formData.institute && formData.duration) {
      if (isEditing) {
        dispatch({
          type: 'UPDATE_EDUCATION',
          payload: education.map(edu =>
            edu.id === isEditing ? { ...formData, id: isEditing } : edu
          )
        });
      } else {
        const newEducation: Education = {
          ...formData,
          id: Date.now().toString()
        };
        dispatch({
          type: 'UPDATE_EDUCATION',
          payload: [...education, newEducation]
        });
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      degree: '',
      institute: '',
      duration: '',
      description: ''
    });
    setIsEditing(null);
  };

  const handleEdit = (edu: Education) => {
    setFormData({
      degree: edu.degree,
      institute: edu.institute,
      duration: edu.duration,
      description: edu.description || ''
    });
    setIsEditing(edu.id);
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: education.filter(edu => edu.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Education</h2>
        <p className="text-gray-600 dark:text-gray-400">Add your educational background and qualifications</p>
      </div>

      {/* Education Form */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {isEditing ? 'Edit Education' : 'Add New Education'}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Degree / Qualification"
              placeholder="Bachelor of Computer Science"
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            />
            
            <Input
              label="Institution"
              placeholder="University of Technology"
              value={formData.institute}
              onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
            />
          </div>

          <Input
            label="Duration"
            placeholder="2018 - 2022"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />

          <Textarea
            label="Description (Optional)"
            placeholder="Relevant coursework, achievements, GPA, honors, etc."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex space-x-3 mt-6">
          <Button onClick={handleSubmit} icon={Plus}>
            {isEditing ? 'Update Education' : 'Add Education'}
          </Button>
          {isEditing && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Education List */}
      {education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">{edu.institute}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">{edu.duration}</span>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {edu.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(edu)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {education.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No education added yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Add your educational background using the form above</p>
        </div>
      )}
    </div>
  );
}