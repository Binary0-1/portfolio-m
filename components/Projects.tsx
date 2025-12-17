import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-serif text-2xl font-medium text-primary mb-6">Projects</h3>

      <div className="space-y-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 gap-2">
               <div className="flex items-center gap-2">
                 <a href={project.link} className="font-medium text-lg text-primary hover:underline decoration-1 underline-offset-4 decoration-secondary/30 flex items-center gap-1">
                    {project.title}
                    <ArrowUpRight size={14} className="opacity-50" />
                 </a>
               </div>
               
               <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded border border-border bg-surface text-secondary font-mono">
                      {tag}
                    </span>
                  ))}
               </div>
            </div>

            <p className="text-sm text-secondary/80 leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;