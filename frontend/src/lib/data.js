// Single source of truth for all portfolio content.
export const profile = {
  name: 'Chethan Sai Kakunuri',
  roles: ['Full Stack Developer', 'Data Science Student'],
  tagline:
    'Computer Science (Data Science) student at Anurag University, Hyderabad with hands-on experience building full-stack MERN applications and ML-powered tools — real-time collaborative systems, a paper trading platform with live market data, and a disease prediction model spanning 150+ conditions, shipping projects from idea to deployment.',
  email: 'kakunurichethansai@gmail.com',
  github: 'https://github.com/KChethansai',
  linkedin: 'https://www.linkedin.com/in/kakunuri-chethan-sai-130a503b5',
  resume: '/resume.pdf',
}

export const stats = [
  { label: 'CGPA', value: 8.91, decimals: 2 },
  { label: 'Projects', value: 3, decimals: 0 },
  { label: 'Internships', value: 2, decimals: 0 },
]

export const projects = [
  {
    title: 'MarketForge — Paper Trading Simulator',
    github: 'https://github.com/KChethansai/Stocks',
    website: 'https://stocks-snowy-eight.vercel.app/',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Zustand', 'Yahoo Finance API', 'Tailwind CSS'],
    year: 'May 2026 – Jun 2026',
    summary:
      'Full-stack paper trading platform tracking 30 stocks with real-time Yahoo Finance market data. JWT cookie authentication with persistent sessions, portfolio tracking, and real-time P&L. Dark premium dashboard using Tailwind CSS, Zustand, and react-hook-form.',
    flagship: true,
    metric: { value: 30, label: 'stocks tracked' },
  },
  {
    title: 'AI Health Prediction Application',
    github: 'https://github.com/KChethansai/Ai-health-prediction-system',
    website: 'https://medibuddy-scan.lovable.app/',
    tech: ['Python', 'FastAPI', 'XGBoost', 'Gradient Boosting', 'OCR'],
    year: 'Oct 2025 – Dec 2025',
    summary:
      'Disease classification model covering 150+ diseases using XGBoost and Gradient Boosting, served via a FastAPI backend. OCR pipeline for extracting medicines from prescription images, plus a medication reminder workflow.',
  },
  {
    title: 'Kanvora — Collaborative Project Board',
    github: 'https://github.com/KChethansai/Trello-Clone',
    website: 'https://trello-clone-5d5t.onrender.com/',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'dnd-kit'],
    year: 'Apr 2026 – Jun 2026',
    summary:
      'Trello-style project management app with real-time collaboration using Socket.IO. Drag-and-drop cards and columns with dnd-kit, including concurrent-edit race-condition handling. Role-based access control (USER / AUTHOR / ADMIN) with JWT authentication, protected routes, and a settings panel for board management.',
  },
]

export const experience = [
  {
    title: 'MERN Stack Intern',
    company: 'Suntek IT Solutions',
    year: 'Feb 2026 – Apr 2026',
    summary:
      'Completed MERN training (JavaScript, Node.js, Express, full-stack development) in 20 training days with a grade of A and 99.4%. Built a full-stack blog application deployed end-to-end on Vercel, Render, and MongoDB Atlas. Delivered an individual project (MarketForge — a MERN stock trading simulator with live market data) and a group project (Kanvora — a real-time Trello-clone with Socket.IO sync and role-based access), serving as Lead Developer.',
  },
  {
    title: 'Virtual Intern',
    company: 'Google Cloud via EduSkills / AICTE',
    year: 'May 2026 – Jun 2026',
    summary:
      "Completed Google's Data Analytics learning path covering BigQuery, Looker Studio, and cloud-based data pipeline fundamentals. Queried large datasets using SQL in BigQuery and built analytical dashboards in Looker Studio. Authored a 60-page internship report documenting BigQuery workflows, Looker Studio dashboards, and data analytics outcomes.",
  },
]

export const skillGroups = [
  { title: 'Frontend', color: '#22d3ee', items: ['React', 'Tailwind CSS', 'Zustand', 'react-beautiful-dnd'] },
  { title: 'Backend', color: '#8b5cf6', items: ['Node.js', 'Express', 'FastAPI', 'Socket.IO'] },
  {
    title: 'Data',
    color: '#34d399',
    items: ['MongoDB', 'MySQL', 'BigQuery', 'Supabase', 'SQL', 'Python', 'XGBoost', 'Gradient Boosting', 'OCR', 'Looker Studio'],
  },
  {
    title: 'Tools',
    color: '#f59e0b',
    items: ['Git', 'GitHub', 'GitHub Actions', 'GitLab', 'Postman', 'Excel', 'Godot', 'Linux', 'Docker', 'JavaScript', 'C', 'C++', 'C#', 'Java'],
  },
]

export const certifications = [
  { title: 'Artificial Intelligence Fundamentals', url: 'https://www.credly.com/badges/073ee3ef-4efc-4981-9d86-73f003b3d4ba/public_url' },
  { title: 'Data Fundamentals', url: 'https://www.credly.com/badges/ba6379b6-2f30-490e-9425-eb499c9e417c/public_url' },
  { title: 'Introduction to Cybersecurity', url: 'https://www.credly.com/badges/8e50d664-c23e-4833-a18b-a660aa0aec74/public_url' },
  { title: 'Networking Basics', url: 'https://www.credly.com/badges/b8a4a4cc-1ec7-4f08-80aa-be58d18dc125/public_url' },
  { title: 'Introduction to Modern AI', url: 'https://www.credly.com/badges/c34be4d9-95a0-48be-bcf3-583cd959a497/public_url' },
]

// Badge/certificate collection — data-driven grid. Each entry optionally pairs
// a badge face image with a certificate image (paths under /public).
// `badge` / `certificate` may be null: the grid renders a monogram seal /
// credential-link fallback instead. Growing the collection is appending entries.
export const badges = [
  ...certifications.map((c, i) => ({
    id: `cert-${i}`,
    label: c.title,
    sub: 'Credly',
    badge: null,
    certificate: null,
    url: c.url,
  })),
  ...projects.map((p, i) => ({
    id: `project-${i}`,
    label: p.title,
    sub: p.year,
    badge: null,
    certificate: null,
    url: p.github,
  })),
]
