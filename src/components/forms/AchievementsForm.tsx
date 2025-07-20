import React, { useState } from 'react';
import { Plus, Edit, Trash2, Award, Calendar } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { usePortfolio } from '../../context/PortfolioContext';
import { Achievement } from '../../types/portfolio';

export function AchievementsForm() {
  const { state, dispatch } = usePortfolio();
  const { achievements } = state.portfolioData;
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Achievement, 'id'>>({
    title: '',
    issuer: '',
    date: '',
    description: ''
  });

  const handleSubmit = () => {
    if (formData.title && formData.issuer && formData.date) {
      if (isEditing) {
        dispatch({
          type: 'UPDATE_ACHIEVEMENTS',
          payload: achievements.map(achievement =>
            achievement.id === isEditing ? { ...formData, id: isEditing } : achievement
          )
        });
      } else {
        const newAchievement: Achievement = {
          ...formData,
          id: Date.now().toString()
        };
        dispatch({
          type: 'UPDATE_ACHIEVEMENTS',
          payload: [...achievements, newAchievement]
        });
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      issuer: '',
      date: '',
      description: ''
    });
    setIsEditing(null);
  };

  const handleEdit = (achievement: Achievement) => {
    setFormData({
      title: achievement.title,
      issuer: achievement.issuer,
      date: achievement.date,
      description: achievement.description || ''
    });
    setIsEditing(achievement.id);
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: 'UPDATE_ACHIEVEMENTS',
      payload: achievements.filter(achievement => achievement.id !== id)
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Achievements & Certificates</h2>
        <p className="text-gray-600 dark:text-gray-400">Showcase your accomplishments and certifications</p>
      </div>

      {/* Achievement Form */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {isEditing ? 'Edit Achievement' : 'Add New Achievement'}
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Title"
            placeholder="AWS Certified Developer"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Issuer / Organization"
              placeholder="Amazon Web Services"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            />
            
            <Input
              label="Date"
              placeholder="December 2023"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <Textarea
            label="Description (Optional)"
            placeholder="Additional details about the achievement, certification, or award..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex space-x-3 mt-6">
          <Button onClick={handleSubmit} icon={Plus}>
            {isEditing ? 'Update Achievement' : 'Add Achievement'}
          </Button>
          {isEditing && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Achievements List */}
      {achievements.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">{achievement.issuer}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span className="text-sm">{achievement.date}</span>
                      </div>
                    </div>
                    {achievement.description && (
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(achievement)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(achievement.id)}
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

      {achievements.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Award className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No achievements added yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Add your certifications and achievements using the form above</p>
        </div>
      )}
    </div>
  );
}