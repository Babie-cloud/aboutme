import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './layout/header';
import Hero from './Pages/Hero';
import SketchGallery from './Pages/SketchGallery';
import TheaterSection from './Pages/TheaterSection';
import Footer from './layout/footer';
import SketchDetail from './Pages/SketchDetail';
import TornPaper from './components/TornPaper';
import { ThemeProvider } from './Pages/ThemeContext'; // Vérifie bien que l'export est "ThemeProvider"
import ThemeToggle from './Pages/ThemeToggle';

export default function App() {
  useEffect(() => {
    // Gestion du scroll fluide
    const handleScroll = (e) => {
      const href = e.target.closest('a')?.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handleScroll);
    return () => document.removeEventListener('click', handleScroll);
  }, []);

  return (
    /* 1. On enveloppe TOUT le site dans le ThemeProvider */
    <ThemeProvider>
      <div className="min-h-screen font-sans selection:bg-red-500/20 transition-colors duration-700 bg-[#fdfcf8] dark:bg-[#0a0a0a] text-black dark:text-white">
        <ThemeToggle />
        
        {/* Le Header est maintenant à l'intérieur, il pourra "écouter" le mode sombre */}
        <Header />
        
        

        <Routes>
          <Route
            path="/"
            element={
              <>
                <main>
                  <Hero />
                  <TornPaper />
                  <SketchGallery />
                  <TheaterSection />
                </main>
                <Footer />
              </>
            }
          />
          <Route path="/dessin/:slug" element={<SketchDetail />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}