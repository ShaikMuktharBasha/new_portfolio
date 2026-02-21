import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import StarField from './components/StarField';
import Header from './components/Header';
import Summary from './components/Summary';
import Proficiency from './components/Proficiency';
import Leadership from './components/Leadership';
import Certifications from './components/Certifications';
import Academic from './components/Academic';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHub from './components/GitHub';
import LinkedIn from './components/LinkedIn';
import Interests from './components/Interests';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [navActive, setNavActive] = useState(false);

  // Performance: Use passive event listeners
  useEffect(() => {
    const passiveSupported = (() => {
      let passive = false;
      try {
        const options = { get passive() { passive = true; return false; } };
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
      } catch(e) {}
      return passive;
    })();

    const passiveOpt = passiveSupported ? { passive: true } : false;

    const noop = () => {};
    document.addEventListener('scroll', noop, passiveOpt);
    document.addEventListener('touchstart', noop, passiveOpt);
    document.addEventListener('touchmove', noop, passiveOpt);
    document.addEventListener('wheel', noop, passiveOpt);

    return () => {
      document.removeEventListener('scroll', noop);
      document.removeEventListener('touchstart', noop);
      document.removeEventListener('touchmove', noop);
      document.removeEventListener('wheel', noop);
    };
  }, []);

  const toggleNav = useCallback(() => {
    requestAnimationFrame(() => {
      setNavActive(prev => !prev);
    });
  }, []);

  const closeNav = useCallback(() => {
    requestAnimationFrame(() => {
      setNavActive(false);
    });
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    requestAnimationFrame(() => {
      setNavActive(false);
      
      if (sectionId === 'header') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.querySelector('.' + sectionId + '-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeNav();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeNav]);

  return (
    <div className="App">
      <Navigation 
        navActive={navActive} 
        toggleNav={toggleNav} 
        closeNav={closeNav}
        scrollToSection={scrollToSection}
      />
      <StarField />
      <Header scrollToSection={scrollToSection} />
      <Summary />
      <Proficiency />
      <Leadership />
      <Certifications />
      <Academic />
      <Skills />
      <Projects />
      <GitHub />
      <LinkedIn />
      <Interests />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
