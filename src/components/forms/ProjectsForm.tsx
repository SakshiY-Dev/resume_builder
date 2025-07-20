import React, { useState } from 'react';
import { Plus, Edit, Trash2, Code, ExternalLink, Github, Star } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';

export function ProjectsForm() {
  const { state, dispatch } = usePortfolio();
  const { projects } = state.portfolioData;
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    techStack: [],
    githubLink: '',
    liveLink: '',
    featured: false
  });
  const [techInput, setTechInput] = useState('');

  const handleSubmit = () => {
    if (formData.title && formData.description) {
      if (isEditing) {
        dispatch({
          type: 'UPDATE_PROJECTS',
          payload: projects.map(project =>
            project.id === isEditing ? { ...formData, id: isEditing } : project
          )
        });
      } else {
        const newProject: Project = {
          ...formData,
          id: Date.now().toString()
        };
        dispatch({
          type: 'UPDATE_PROJECTS',
          payload: [...projects, newProject]
        });
      }
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      techStack: [],
      githubLink: '',
      liveLink: '',
      featured: false
    });
    setTechInput('');
    setIsEditing(null);
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      githubLink: project.githubLink,
      liveLink: project.liveLink,
      featured: project.featured
    });
    setIsEditing(project.id);
  };

  const handleDelete = (id: string) => {
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: projects.filter(project => project.id !== id)
    });
  };

  const addTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTech = (tech: string) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter(t => t !== tech)
    });
  };

  const toggleFeatured = (id: string) => {
    dispatch({
      type: 'UPDATE_PROJECTS',
      payload: projects.map(project =>
        project.id === id ? { ...project, featured: !project.featured } : project
      )
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Projects</h2>
        <p className="text-gray-600 dark:text-gray-400">Showcase your best work and achievements</p>
      </div>

      {/* Project Form */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {isEditing ? 'Edit Project' : 'Add New Project'}
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Project Title"
              placeholder="My Awesome App"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            
            <div className="flex items-center">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Featured Project</span>
              </label>
            </div>
          </div>

          <Textarea
            label="Description"
            placeholder="Describe what the project does, the problems it solves, and your role in it..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* Tech Stack */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tech Stack
            </label>
            <div className="flex space-x-2 mb-2">
              <Input
                placeholder="Add technology (e.g., React, Node.js)"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTech()}
              />
              <Button onClick={addTech} variant="outline">
                Add
              </Button>
            </div>
            {formData.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tech}
                    <button
                      onClick={() => removeTech(tech)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="GitHub Link"
              placeholder="https://github.com/username/project"
              value={formData.githubLink}
              onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
            />
            
            <Input
              label="Live Demo Link"
              placeholder="https://project-demo.com"
              value={formData.liveLink}
              onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <Button onClick={handleSubmit} icon={Plus}>
            {isEditing ? 'Update Project' : 'Add Project'}
          </Button>
          {isEditing && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Projects List */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Your Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`bg-white dark:bg-gray-800 p-6 rounded-lg border ${
                  project.featured 
                    ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10 dark:border-yellow-700' 
                    : 'border-gray-200 dark:border-gray-700'
                } hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="w-4 h-4 text-blue-600" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                      {project.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex space-x-3 mb-4">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
                        >
                          <Github className="w-4 h-4" />
                          <span>Code</span>
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => toggleFeatured(project.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        project.featured
                          ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                          : 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
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

      {projects.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Code className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects added yet</h3>
          <p className="text-gray-500 dark:text-gray-400">Add your first project using the form above</p>
        </div>
      )}
    </div>
  );
}