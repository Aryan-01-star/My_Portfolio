import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Github, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  techStack: string[];
}

const base = import.meta.env.BASE_URL;

const projects: Project[] = [
  {
    id: 1,
    title: "OrganicHub",
    description: "Smart farming platform leveraging AI, real-time weather, and soil data — helping farmers reduce water and fertilizer use by 25%",
    tags: ["Full-Stack", "AI", "REST API"],
    image: `${base}organichub.png`,
    demoUrl: "https://organichub-akp.netlify.app/",
    githubUrl: "https://github.com/Aryan-01-star/OrganicHub.git",
    techStack: ["JavaScript", "CSS", "RestAPI"]
  },
  {
    id: 2,
    title: "StudySphere",
    description: "AI-enabled Study Portal with quiz games, leaderboards, shared spaces, and planning tools — ranked Top 15 among 40+ teams at a hackathon. Currently in active development; UI/UX prototype available.",
    tags: ["UI/UX", "Figma", "In Development"],
    image: `${base}studyplatform.png`,
    demoUrl: "https://www.figma.com/design/zuawz1ZyQcdXMbgDLle942/Untitled?node-id=0-1&t=ZgwrMjuDUCxNZNwL-1",
    githubUrl: "",
    techStack: ["React.js", "Firebase", "Python", "Figma"]
  },
  {
    id: 3,
    title: "Travelo",
    description: "AI-based budget and interest-based trip recommendation system, achieving 90% user satisfaction from 50 users during QA testing",
    tags: ["Full-Stack", "AI", "UX"],
    image: `${base}travelo.png`,
    demoUrl: "https://tripstar-byakp.netlify.app/",
    githubUrl: "https://github.com/Aryan-01-star/Travel-Website.git",
    techStack: ["HTML", "CSS", "JS", "API"]
  },
  {
    id: 4,
    title: "E-Commerce UI",
    description: "Conceptualized and designed a modern E-Commerce UI/UX, focusing on intuitive navigation and a visually appealing shopping experience",
    tags: ["UI/UX", "Figma", "Web Design"],
    image: `${base}ecommerce.png`,
    demoUrl: "https://www.figma.com/proto/k2ltZi6GB8VBaZnYKDsAhE/Kirti2024?node-id=32-16&starting-point-node-id=32%3A16&t=GYpDwZf1DFuTstWP-1",
    githubUrl: "",
    techStack: ["Figma", "Web Design", "UI/UX"]
  },
  {
    id: 5,
    title: "Portfolio",
    description: "This very site — a minimal, modern portfolio built with React, TypeScript, and Tailwind CSS with 3D Spline animations",
    tags: ["React", "TypeScript", "Tailwind"],
    image: `${base}portfolio.png`,
    demoUrl: "#",
    githubUrl: "",
    techStack: ["React", "TypeScript", "Tailwind CSS"]
  }
];

const ProjectCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    let intervalId: number;
    if (isAutoPlaying) {
      intervalId = window.setInterval(nextSlide, 5000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center"
          >
            {/* Image first on mobile */}
            <div className="relative aspect-video rounded-xl overflow-hidden order-first md:order-last bg-black/30">
              <img
                src={projects[currentIndex].image}
                alt={projects[currentIndex].title}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-purple-400 text-xs font-medium tracking-wider">
                  PROJECT {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mt-1">
                  {projects[currentIndex].title}
                </h3>
              </div>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {projects[currentIndex].description}
              </p>

              <div className="flex flex-wrap gap-2">
                {projects[currentIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-xs border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <a
                  href={projects[currentIndex].demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
                {projects[currentIndex].githubUrl && projects[currentIndex].githubUrl !== '#' && (
                  <a
                    href={projects[currentIndex].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Github size={16} />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 px-1">
        <div className="flex space-x-1.5">
          {projects.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to project ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-purple-500 w-6'
                  : 'bg-white/10 w-1.5 hover:bg-white/20'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            aria-label="Previous project"
            onClick={prevSlide}
            className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={nextSlide}
            className="p-2 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCarousel;
