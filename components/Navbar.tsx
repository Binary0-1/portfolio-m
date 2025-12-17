import React from 'react';
import { RESUME_DATA } from '../constants';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 pointer-events-none">
      <nav className="flex items-center gap-6 bg-background/80 backdrop-blur-xl border border-border/50 px-5 py-2.5 rounded-full shadow-sm pointer-events-auto">
         
         <div className="w-2 h-2 rounded-full bg-primary/20"></div>

         <div className="flex items-center gap-4 text-xs font-medium text-secondary">
            <a href="#" className="hover:text-primary transition-colors">Resume</a>
            <a href="#work" className="hover:text-primary transition-colors">Projects</a>
         </div>

         <div className="w-px h-3 bg-border"></div>

         <button 
           onClick={toggleTheme}
           className="text-secondary hover:text-primary transition-colors flex items-center justify-center"
           aria-label="Toggle Theme"
         >
           {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
         </button>
      </nav>
    </header>
  );
};

export default Navbar;