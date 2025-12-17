import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-2xl mx-auto px-6 py-8 mt-12 border-t border-border/60 flex flex-col md:flex-row justify-between items-center text-xs text-secondary/60">
        <div>
           © {new Date().getFullYear()} Alex Sterling. All rights reserved.
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0 font-medium">
           <a href="#" className="hover:text-primary transition-colors">Twitter</a>
           <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
           <a href="#" className="hover:text-primary transition-colors">Email</a>
        </div>
    </footer>
  );
};

export default Footer;