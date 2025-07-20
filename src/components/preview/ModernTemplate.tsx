import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Star,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { PortfolioData } from "../../types/portfolio";

interface ModernTemplateProps {
  data: PortfolioData;
}

export function ModernTemplate({ data }: ModernTemplateProps) {
  const {
    personalInfo,
    skills,
    experience,
    projects,
    education,
    achievements,
  } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {personalInfo.profilePicture && (
            <img
              src={personalInfo.profilePicture}
              alt={personalInfo.fullName}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          )}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{personalInfo.fullName}</h1>
            <p className="text-xl mb-4 opacity-90">{personalInfo.title}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
            </div>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  className="flex items-center gap-1 hover:underline"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {personalInfo.linkedin && (
                <a
                  href={personalInfo.linkedin}
                  className="flex items-center gap-1 hover:underline"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              About Me
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <=
                          [
                            "Beginner",
                            "Intermediate",
                            "Advanced",
                            "Expert",
                          ].indexOf(skill.level) +
                            1
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {skill.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="border-l-4 border-blue-600 pl-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    {exp.current && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">{exp.company}</span>
                    <span>•</span>
                    <Calendar className="w-4 h-4" />
                    <span>{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    {project.featured && (
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  {project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                      >
                        <Github className="w-4 h-4" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="border-l-4 border-blue-600 pl-4">
                  <h3 className="text-lg font-semibold">{edu.degree}</h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
                    <GraduationCap className="w-4 h-4" />
                    <span className="font-medium">{edu.institute}</span>
                    <span>•</span>
                    <Calendar className="w-4 h-4" />
                    <span>{edu.duration}</span>
                  </div>
                  {edu.description && (
                    <p className="text-gray-700 dark:text-gray-300">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Achievements & Certificates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <h3 className="font-semibold">{achievement.title}</h3>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    <span className="font-medium">{achievement.issuer}</span>
                    <span className="mx-2">•</span>
                    <span>{achievement.date}</span>
                  </div>
                  {achievement.description && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {achievement.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
