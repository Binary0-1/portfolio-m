import React from 'react';
import { EXPERIENCES } from '../constants';

const Experience: React.FC = () => {
  return (
    <div className="space-y-6">
      <h3 className="font-serif text-2xl font-medium text-primary mb-6">Experience</h3>
      
      <div className="space-y-8">
        {EXPERIENCES.map((exp) => (
          <div key={exp.id} className="group">
             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                <h4 className="font-medium text-lg text-primary group-hover:underline decoration-1 underline-offset-4 decoration-secondary/30">
                  {exp.role}
                </h4>
                <span className="font-mono text-xs text-secondary/70 tabular-nums whitespace-nowrap">
                  {exp.period}
                </span>
             </div>
             
             <div className="text-sm font-medium text-secondary mb-3">
               {exp.company}
             </div>
             
             <ul className="list-disc list-outside ml-4 space-y-1.5">
               {exp.description.map((point, idx) => (
                 <li key={idx} className="text-sm text-secondary/80 pl-1 leading-relaxed">
                   {point}
                 </li>
               ))}
             </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;