import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Pages/ThemeContext';

import Header from './layout/header';
import Footer from './layout/footer';
import TornPaper from './components/TornPaper';

import Hero from './Pages/Hero';
import SketchGallery from './Pages/SketchGallery';
import TheaterSection from './Pages/TheaterSection';
import HomeSections from './Pages/HomeSections';

import SketchDetail from './Pages/SketchDetail';

const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function HomePage() {
  return (
    <>
      <Hero />
      <TornPaper />
      <SketchGallery />
      <TheaterSection />
      <HomeSections />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="relative min-h-screen bg-[#060607] text-zinc-100">
          <div
            className="pointer-events-none fixed inset-0 opacity-[0.035]"
            style={{ backgroundImage: grainSvg }}
            aria-hidden
          />
          <div
            className="pointer-events-none fixed inset-0"
            aria-hidden
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% -20%, rgb(153 27 27 / 0.18), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgb(127 29 29 / 0.12), transparent 45%)',
            }}
          />

          <div className="relative z-10">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sketch/:slug" element={<SketchDetail />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
