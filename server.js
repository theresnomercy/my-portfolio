const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Basic in-memory data to drive views
const projects = [
  {
    slug: 'dev-taskboard-api',
    name: 'Dev Taskboard API',
    shortDescription: 'RESTful task management backend with JWT-ready architecture and modular routing.',
    description:
      'A backend-focused project that exposes a clean, well-documented REST API for managing projects, tasks, and labels. Built to emphasize structure, maintainability, and real-world patterns like controllers and middleware.',
    problem:
      'Many student projects mix business logic directly into route handlers, making them hard to maintain or scale.',
    solution:
      'Designed a layered architecture separating routing, controllers, and utilities, making the codebase easier to extend and reason about.',
    technologies: ['Node.js', 'Express', 'REST', 'Postman'],
    challenges:
      'Balancing simplicity with production-like patterns without over-engineering, while keeping the API surface clean and intuitive.',
    outcome:
      'Produced a backend service that could be dropped into a larger system, showcasing readiness for real-world backend work.',
    github: 'https://github.com/',
    demo: null,
  },
  {
    slug: 'portfolio-platform-v1',
    name: 'Portfolio Platform v1',
    shortDescription:
      'Multi-page Express + EJS portfolio platform engineered like a production web product.',
    description:
      'This very site, built to communicate technical maturity through structure, routing, and interaction design.',
    problem:
      'Typical portfolios feel like one-off static pages and fail to showcase understanding of backend routing or modular frontends.',
    solution:
      'Implemented a server-rendered, multi-page architecture with shared partials, layout discipline, and a clear routing strategy.',
    technologies: ['Node.js', 'Express', 'EJS', 'CSS3'],
    challenges:
      'Balancing visual flair and animations with performance and readability on a dark, high-contrast interface.',
    outcome:
      'A portfolio that feels like a real product, reinforcing that the creator understands scalable web foundations.',
    github: 'https://github.com/',
    demo: null,
  },
  {
    slug: 'php-blog-engine',
    name: 'PHP Blog Engine',
    shortDescription:
      'Lightweight blog engine demonstrating routing, templating, and content structuring using PHP.',
    description:
      'A small but structured blog engine using PHP to reinforce backend fundamentals and templating beyond JavaScript.',
    problem:
      'Static pages quickly become unmanageable as content grows, especially without reusable templates and routing.',
    solution:
      'Introduced layout templates, partials, and clean URL routing so new posts and sections can be added with minimal friction.',
    technologies: ['PHP', 'HTML5', 'CSS3'],
    challenges:
      'Keeping the codebase approachable for future iteration while not sacrificing best practices around separation of concerns.',
    outcome:
      'A solid demonstration that concepts like layout composition and routing are transferable across stacks.',
    github: 'https://github.com/',
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

