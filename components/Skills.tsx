import React from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  // Group skills by category
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <div className="space-y-6">
       <h3 className="font-serif text-2xl font-medium text-primary mb-6">Skills</h3>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
          {categories.map(category => (
            <div key={category}>
               <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2 border-b border-border/50 pb-1">
                 {category}
               </h4>
               <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {SKILLS.filter(s => s.category === category).map((skill, idx, arr) => (
                    <span key={skill.name} className="text-sm text-primary">
                      {skill.name}{idx !== arr.length - 1 && <span className="text-secondary/40 select-none">,</span>}
                    </span>
                  ))}
               </div>
            </div>
          ))}
       </div>
    </div>
  );
};

export default Skills;