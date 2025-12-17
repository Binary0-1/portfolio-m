import React from 'react';
import { RESUME_DATA } from '../constants';
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row md:items-start justify-between gap-8">
       
       <div className="flex-1 space-y-4">
          <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-full bg-green-100/50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 w-fit">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-green-700 dark:text-green-400">Available for work</span>
           </div>

          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-primary tracking-tight">
              {RESUME_DATA.name}
            </h1>
            <h2 className="text-lg text-secondary font-medium mt-1">
              {RESUME_DATA.title}
            </h2>
          </div>

          <p className="text-secondary text-sm leading-relaxed max-w-2xl">
            {RESUME_DATA.bio}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-secondary pt-2">
             <div className="flex items-center gap-1.5">
                <MapPin size={14} />
                <span>{RESUME_DATA.location}</span>
             </div>
             <a href={`mailto:${RESUME_DATA.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail size={14} />
                <span>{RESUME_DATA.email}</span>
             </a>
          </div>

          <div className="flex gap-4 pt-2">
             <a href={RESUME_DATA.socials.github} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors"><Github size={18} /></a>
             <a href={RESUME_DATA.socials.linkedin} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors"><Linkedin size={18} /></a>
             <a href={RESUME_DATA.socials.twitter} target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors"><Twitter size={18} /></a>
          </div>
       </div>

       {/* Optional Photo for Resume */}
       <div className="hidden md:block shrink-0">
          <img 
            src={`https://ui-avatars.com/api/?name=${RESUME_DATA.name.replace(' ', '+')}&background=18181b&color=fff&size=128`} 
            alt="Profile" 
            className="w-24 h-24 rounded-lg object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-sm"
          />
       </div>

    </section>
  );
};

export default Hero;