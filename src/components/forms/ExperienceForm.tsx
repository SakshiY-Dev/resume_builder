import React, { useState } from 'react';
import { Plus, Edit, Trash2, Briefcase, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { usePortfolio } from '../../context/PortfolioContext';
import { Experience } from '../../types/portfolio';

export function ExperienceForm() {
  const { state, dispatch } = usePortfolio();
  const { experience } = state.portfolioData;
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    role: '',
    company: '',
    duration: '',
    description: '',
    current: false
  });

  const handleSubmit = () => {
    if (formData.role && formData.company && formData.duration) {
      if (isEditing) {
        dispatch({
          type: 'UPDATE_EXPERIENCE',
          payload: experience.map(exp =>
            exp.id === isEditing ? { ...formData, id: isEditing } : exp
          )
        });
      } else {
        const newExperience: Experience = {
          ...formData,
          id: Date.now().toString()
        };
        dispatch({
          type: 'UPDATE_EXPERIENCE',
          payload: [...experience, newExperience]
        });
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      role: '',
      company: '',
      duration: '',
      description: '',
      current: false
    });
    setIsEditing(null);
  };

  const handleEdit = (exp: Experience) => {
    setFormData({
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      description: exp.description,
      current: exp.current
    });
    setIsEditing(exp.id);
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: experience.filter(exp => exp.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Work Experience</h2>
        <p className="text-gray-600 dark:text-gray-400">Add your professional experience and achievements</p>
      </div>

      {/* Experience Form */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {isEditing ? 'Edit Experience' : 'Add New Experience'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Job Title"
            placeholder="Frontend Developer"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          />
          
          <Input
            label="Company"
            placeholder="Tech Company Inc."
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          />
          
          <Input
            label="Duration"
            placeholder="Jan 2022 - Present"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          />
          
          <div className="flex items-center">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={formData.current}
                onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Current Position</span>
            </label>
          </div>
        </div>

        <Textarea
          label="Description"
          placeholder="Describe your responsibilities, achievements, and key contributions..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mb-4"
        />

        <div className="flex space-x-3">
          <Button onClick={handleSubmit} icon={Plus}>
            {isEditing ? 'Update Experience' : 'Add Experience'}
          </Button>
          {isEditing && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Experience List */}
      {experience.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Experience</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">{exp.role}</h4>
                      {exp.current && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">{exp.company}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
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

      {experience.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No experience added yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Add your first work experience using the form above</p>
        </div>
      )}
    </div>
  );
}