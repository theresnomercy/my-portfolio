const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic in-memory data to drive views
const courses = [
  {
    type: 'Certificate',
    dateLabel: 'Jan 2026',
    title: 'Excel Essential Training (Microsoft 365)',
    provider: 'LinkedIn Learning',
  },
  {
    type: 'Course',
    dateLabel: '2026',
    title: 'JavaScript',
    provider: 'Tuwaiq Academy',
  },
  {
    type: 'Course',
    dateLabel: '2026',
    title: 'Node.js',
    provider: 'Tuwaiq Academy',
  },
  {
    type: 'Course',
    dateLabel: '2026',
    title: 'Git & GitHub Version Control Training Series',
    provider: 'Tuwaiq Academy',
  },
  {
    type: 'Course',
    dateLabel: '2026',
    title: 'YAML Configuration Training',
    provider: 'Tuwaiq Academy',
  },
  {
    type: 'Course',
    dateLabel: '2026',
    title: 'CI/CD Fundamentals Training',
    provider: 'Tuwaiq Academy',
  },
  {
    type: 'Certificate',
    dateLabel: '2026',
    title: 'PowerShell Step-by-Step',
    provider: 'Udemy',
  },
];

const projects = [
  {
    slug: 'portfolio-platform',
    name: 'Portfolio Platform',
    shortDescription: 'Multi-page Express + EJS portfolio platform engineered like a product.',
    description:
      'A portfolio platform built with an app-like structure: shared partials, clean routing, and a consistent UI system across pages.',
    problem:
      'Many portfolios are static one-offs that don’t demonstrate backend routing, maintainable structure, or reusable UI composition.',
    solution:
      'Built a multi-page Express + EJS application with shared layouts, predictable routes, and a cohesive design system.',
    technologies: ['Node.js', 'Express', 'EJS', 'CSS3'],
    challenges:
      'Balancing visual polish with performance and readability while keeping the codebase modular and easy to iterate.',
    outcome:
      'A portfolio that behaves like a real web product and clearly communicates engineering fundamentals.',
    github: 'https://github.com/theresnomercy/my-portfolio',
    demo: null,
  },
  {
    slug: 'ticket-support-system',
    name: 'Ticket Support System',
    shortDescription:
      'Backend-driven support request manager with CRUD, structured routing, and lifecycle handling.',
    description:
      'A functional backend-driven system for managing support requests, focusing on CRUD operations, structured routing, and request lifecycle.',
    problem:
      'Support requests become difficult to track and maintain without clear routing, predictable CRUD flows, and lifecycle states.',
    solution:
      'Implemented structured routes and handlers that support creating, reading, updating, and closing tickets with a clean request lifecycle.',
    technologies: ['Node.js', 'Express', 'REST'],
    challenges:
      'Designing a clear lifecycle model while keeping routes consistent and responses easy to reason about.',
    outcome:
      'A maintainable ticket workflow that demonstrates backend fundamentals: CRUD, routing discipline, and lifecycle state transitions.',
    github: 'https://github.com/theresnomercy/ticket-support-system',
    demo: null,
  },
];

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets
app.use(express.static(path.join(__dirname, 'public')));

// Global locals for views
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.year = new Date().getFullYear();
  res.locals.projects = projects;
  res.locals.courses = courses;
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Home | Sami AL-Shammari',
    page: 'home',
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    title: 'Projects | Sami AL-Shammari',
    page: 'projects',
  });
});

app.get('/projects/:slug', (req, res) => {
  const project = projects.find((p) => p.slug === req.params.slug);
  if (!project) {
    return res.status(404).render('project-not-found', {
      title: 'Project Not Found | Sami AL-Shammari',
      page: 'projects',
    });
  }

  res.render('project-detail', {
    title: `${project.name} | Projects | Sami AL-Shammari`,
    page: 'projects',
    project,
  });
});

app.get('/skills', (req, res) => {
  res.render('skills', {
    title: 'Skills | Sami AL-Shammari',
    page: 'skills',
  });
});

app.get('/courses', (req, res) => {
  res.render('courses', {
    title: 'Courses | Sami AL-Shammari',
    page: 'courses',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About | Sami AL-Shammari',
    page: 'about',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact | Sami AL-Shammari',
    page: 'contact',
  });
});

// Resume static file route (served from /public)
app.get('/resume', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resume', 'Sami-AL-Shammari-Resume.pdf'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found | Sami AL-Shammari',
    page: null,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});

