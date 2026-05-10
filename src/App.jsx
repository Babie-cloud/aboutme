import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Pages/ThemeContext';

// Layout
import Header from './layout/header';
import Footer from './layout/footer';
import TornPaper from './components/TornPaper';

// Sections
import Hero from './Pages/Hero';
import SketchGallery from './Pages/SketchGallery';
import TheaterSection from './Pages/TheaterSection';


import SketchDetail from './Pages/SketchDetail';

function HomePage() {
  return (
    <>
      <Hero />
      <TornPaper />
      <SketchGallery />
      <TheaterSection />
    
     
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-500 bg-[#fdfcf8] dark:bg-[#0a0a0a]">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/sketch/:slug" element={<SketchDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}