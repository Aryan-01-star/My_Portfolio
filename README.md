<div align="center">

# Aryan Kumar Pandey — Portfolio

A modern, interactive developer portfolio built with React, TypeScript, and Framer Motion — featuring 3D animations, dynamic carousels, and a dark-themed UI.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion)

</div>

---

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| **Framework**    | React 18 + TypeScript                           |
| **Build**        | Vite                                            |
| **Styling**      | Tailwind CSS, PostCSS, Autoprefixer             |
| **Animations**   | Framer Motion, custom CSS keyframes             |
| **3D / Visual**  | Spline React, 3D Pin Cards, World Map           |
| **Routing**      | React Router DOM                                |
| **Icons**        | Lucide React                                    |
| **Utilities**    | React Scroll, React Intersection Observer, File Saver |

---

## Features

- **Interactive Hero** — animated IDE/terminal visualization with typing effect, floating tech badges, and encrypted text reveal
- **3D Pin Cards** — tilt-on-hover skill cards with shadow and depth effects
- **Project Carousel** — auto-playing showcase with demo links, GitHub repos, and tech tags
- **World Map** — animated SVG map with connection lines from Delhi to global cities
- **Responsive Navigation** — floating dock (desktop) + hamburger slide-out (mobile) with glass-morphism navbar
- **Resume Download** — one-click PDF download with file validation
- **Scroll Animations** — intersection-observer-driven section reveals with Framer Motion
- **Dark Theme** — custom surface color palette with purple accents

---

## Project Structure

```
project/
├── public/
│   ├── resume.pdf
│   └── *.png                  # Project screenshots
├── src/
│   ├── components/
│   │   ├── navigation/        # Navbar, FloatingDockNav, MobileMenu
│   │   ├── ui/                # Reusable UI primitives (3d-pin, meteors, encrypted-text, world-map, etc.)
│   │   ├── Hero.tsx           # Landing section + DevSetup
│   │   ├── Skills.tsx         # Skill categories with 3D cards / carousel
│   │   ├── Projects.tsx       # Featured projects grid
│   │   ├── Education.tsx      # Timeline component
│   │   ├── Certifications.tsx # Certification cards
│   │   └── Contact.tsx        # Social links + world map
│   ├── hooks/
│   │   └── useActiveSection.ts
│   ├── utils/
│   │   └── downloadHelpers.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** >= 9 (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/aryankumar-pandey/My_Portfolio.git
cd My_Portfolio/project

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Scripts

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `npm run dev`        | Start Vite dev server              |
| `npm run build`      | Production build to `dist/`        |
| `npm run preview`    | Preview the production build       |
| `npm run lint`       | Run ESLint                         |

---

## Deployment

Build the production bundle and deploy the `dist/` directory to any static host:

```bash
npm run build
```

Compatible with **Vercel**, **Netlify**, **Cloudflare Pages**, **GitHub Pages**, or any static file server.

---

## Customization

| What to change       | Where                                               |
| -------------------- | --------------------------------------------------- |
| Personal info        | `Hero.tsx`, `Contact.tsx`, `Education.tsx`           |
| Projects             | `Projects.tsx` — `projects` array                   |
| Skills               | `Skills.tsx` — `skillCategories` array              |
| Certifications       | `Certifications.tsx` — `certifications` array       |
| Resume               | Replace `public/resume.pdf`                         |
| Theme colors         | `tailwind.config.js` — `colors.surface`             |

---

## Contributing

Contributions are welcome! If you have suggestions or find any issues, feel free to submit a pull request or open an issue.

## License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**[Live Demo](https://aryankumarpandey.vercel.app)** · **[LinkedIn](https://linkedin.com/in/aryankumar-pandey)** · **[GitHub](https://github.com/aryankumar-pandey)**

</div>
