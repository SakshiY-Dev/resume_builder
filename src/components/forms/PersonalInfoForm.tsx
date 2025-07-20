import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Github, Linkedin, Upload, X } from 'lucide-react';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { usePortfolio } from '../../context/PortfolioContext';

export function PersonalInfoForm() {
  const { state, dispatch } = usePortfolio();
  const { personalInfo } = state.portfolioData;
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });
  };

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('profilePicture', e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Personal Information</h2>
        <p className="text-gray-600 dark:text-gray-400">Let's start with your basic details</p>
      </div>

      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          {personalInfo.profilePicture ? (
            <div className="relative">
              <img
                src={personalInfo.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <button
                onClick={() => handleInputChange('profilePicture', '')}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div
              className={`w-32 h-32 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
          className="hidden"
          id="profile-upload"
        />
        <label htmlFor="profile-upload">
          <div className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:hover:bg-gray-800 dark:text-gray-300 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Upload Photo
          </div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={personalInfo.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
        />
        
        <Input
          label="Professional Title"
          placeholder="Frontend Developer"
          value={personalInfo.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
        
        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={personalInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        
        <Input
          label="Phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={personalInfo.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
        
        <Input
          label="Location"
          placeholder="New York, NY"
          value={personalInfo.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
        />
        
        <Input
          label="LinkedIn"
          placeholder="https://linkedin.com/in/johndoe"
          value={personalInfo.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
        />
        
        <div className="md:col-span-2">
          <Input
            label="GitHub"
            placeholder="https://github.com/johndoe"
            value={personalInfo.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
          />
        </div>
      </div>

      <Textarea
        label="Professional Summary"
        placeholder="Write a brief summary about yourself, your experience, and what you're passionate about..."
        value={personalInfo.summary}
        onChange={(e) => handleInputChange('summary', e.target.value)}
        className="min-h-[120px]"
      />
    </div>
  );
}