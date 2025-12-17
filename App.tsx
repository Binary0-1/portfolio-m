import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ChatAssistant from './components/ChatAssistant';
import Footer from './components/Footer';
import Playground from './components/Playground';
import { Meteors } from './components/ui/meteors';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className=" min-h-screen bg-background text-primary relative transition-colors duration-500 overflow-x-hidden font-sans selection:bg-zinc-200 dark:selection:bg-zinc-700">

      {/* Top Navigation */}
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      {/* Main Resume Sheet Container */}
      <main className="relative z-10 max-w-4xl mx-auto mt-24 mb-24 px-4 sm:px-6">

        
        {/* Glass/Paper Document Surface */}
        <div className=" p-8 md:p-12 animate-fade-in">
      {/* <Meteors number={20} /> */}

          
          {/* Header / Summary */}
          <Hero />

          <hr className="my-10 border-border" />

          {/* Experience Section */}
          <section id="experience" className="scroll-mt-28">
             <Experience />
          </section>

          <hr className="my-10 border-border" />

          {/* Projects Section */}
          <section id="work" className="scroll-mt-28">
             <Projects />
          </section>

          <hr className="my-10 border-border" />

          {/* Skills Section */}
          <section className="scroll-mt-28">
             <Skills />
          </section>

        </div>

        {/* Playground sits outside the formal resume sheet */}
        <div className="mt-12 opacity-80 hover:opacity-100 transition-opacity">
           <Playground isDarkMode={isDarkMode} />
        </div>

      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

export default App;