import React, { useState } from 'react';
import { Plus, X, Star } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { usePortfolio } from '../../context/PortfolioContext';
import { Skill } from '../../types/portfolio';

export function SkillsForm() {
  const { state, dispatch } = usePortfolio();
  const { skills } = state.portfolioData;
  const [newSkill, setNewSkill] = useState({ name: '', level: 'Intermediate' as const });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill.name.trim(),
        level: newSkill.level
      };
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: [...skills, skill]
      });
      setNewSkill({ name: '', level: 'Intermediate' });
    }
  };

  const handleRemoveSkill = (id: string) => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: skills.filter(skill => skill.id !== id)
    });
  };

  const handleUpdateSkillLevel = (id: string, level: Skill['level']) => {
    dispatch({
      type: 'UPDATE_SKILLS',
      payload: skills.map(skill => 
        skill.id === id ? { ...skill, level } : skill
      )
    });
  };

  const skillLevels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const getStarCount = (level: Skill['level']) => {
    switch (level) {
      case 'Beginner': return 1;
      case 'Intermediate': return 2;
      case 'Advanced': return 3;
      case 'Expert': return 4;
      default: return 2;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Skills & Expertise</h2>
        <p className="text-gray-600 dark:text-gray-400">Add your technical and professional skills</p>
      </div>

      {/* Add New Skill */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Skill</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Skill name (e.g., React, JavaScript, UI/UX Design)"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
          </div>
          <select
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value as Skill['level'] })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {skillLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          <Button onClick={handleAddSkill} icon={Plus}>
            Add Skill
          </Button>
        </div>
      </div>

      {/* Skills List */}
      {skills.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{skill.name}</h4>
                  <button
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 cursor-pointer transition-colors ${
                          star <= getStarCount(skill.level)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        onClick={() => {
                          const levels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
                          handleUpdateSkillLevel(skill.id, levels[star - 1]);
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Star className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No skills added yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Add your first skill using the form above</p>
        </div>
      )}
    </div>
  );
}