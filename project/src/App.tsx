import { lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './components/navigation/Navbar';
import Hero from './components/Hero';
import { Meteors } from './components/ui/meteors';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));

const Divider = () => (
  <div className="max-w-5xl mx-auto px-4">
    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
  </div>
);

function App() {
  return (
    <Router>
      <div className="bg-surface min-h-screen overflow-x-hidden text-white relative">
        {/* Layer 1: Ambient glows — smaller on mobile */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 -left-32 w-[300px] h-[450px] sm:w-[600px] sm:h-[900px] glow-purple rounded-full opacity-60" />
          <div className="absolute top-2/3 -right-32 w-[250px] h-[350px] sm:w-[500px] sm:h-[700px] glow-blue rounded-full opacity-60" />
        </div>

        {/* Layer 2: Meteors — fewer on mobile */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-20 hidden sm:block">
          <Meteors number={5} />
        </div>

        {/* Layer 3: Single glass panel for all content */}
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Suspense fallback={null}>
            <Divider />
            <Skills />
            <Divider />
            <Projects />
            <Divider />
            <Education />
            <Divider />
            <Certifications />
            <Divider />
            <Contact />
          </Suspense>
          <footer className="py-4 px-4 text-center">
            <div className="max-w-5xl mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-4" />
              <p className="text-gray-600 text-sm tracking-wide">
                © {new Date().getFullYear()} Aryan Kumar Pandey
              </p>
            </div>
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;
