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
  { label: 'CGPA', value: 8.87, decimals: 2 },
  { label: 'Projects', value: 3, decimals: 0 },
  { label: 'Internships', value: 2, decimals: 0 },
]

export const projects = [
  {
    title: 'MarketForge — Paper Trading Simulator',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Zustand', 'Yahoo Finance API', 'Tailwind CSS'],
    year: 'May 2026 – Jun 2026',
    summary:
      'Full-stack paper trading platform tracking 30 stocks with real-time Yahoo Finance market data. JWT cookie authentication with persistent sessions, portfolio tracking, and real-time P&L. Dark premium dashboard using Tailwind CSS, Zustand, and react-hook-form.',
    flagship: true,
    metric: { value: 30, label: 'stocks tracked' },
  },
  {
    title: 'AI Health Prediction Application',
    tech: ['Python', 'FastAPI', 'XGBoost', 'Gradient Boosting', 'OCR'],
    year: 'Oct 2025 – Dec 2025',
    summary:
      'Disease classification model covering 150+ diseases using XGBoost and Gradient Boosting, served via a FastAPI backend. OCR pipeline for extracting medicines from prescription images, plus a medication reminder workflow.',
  },
  {
    title: 'Kanvora — Collaborative Project Board',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'dnd-kit'],
    year: 'Apr 2026 – Jun 2026',
    summary:
      'Trello-style project management app with real-time collaboration using Socket.IO. Drag-and-drop cards and columns with concurrent-edit race-condition handling. USER / AUTHOR / ADMIN role-based access control.',
  },
]

export const experience = [
  {
    title: 'MERN Stack Intern',
    company: 'Suntek IT Solutions',
    year: 'Feb 2026 – Apr 2026',
    summary:
      'Completed MERN training (JavaScript, Node.js, Express, full-stack development) spanning 20 training days across 2–3 sessions a week, graded A with 99.4%. Built a full-stack blog application deployed end-to-end on Vercel, Render, and MongoDB Atlas. Delivered two production-grade MERN applications — MarketForge (individual) and Kanvora (group) — serving as Lead Developer.',
  },
  {
    title: 'Virtual Intern',
    company: 'Google Cloud via EduSkills / AICTE',
    year: 'May 2026 – Jun 2026',
    summary:
      "Completed Google's Data Analytics learning path covering BigQuery, Looker Studio, and cloud-based data pipeline fundamentals. Queried large datasets using SQL in BigQuery and built analytical dashboards in Looker Studio. Authored a 30-page internship report documenting BigQuery workflows, Looker Studio dashboards, and data analytics outcomes.",
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

export const education = [
  { title: 'B.Tech CSE (Data Science)', place: 'Anurag University', year: '2024 - 2028', status: 'ongoing', detail: 'CGPA 8.87' },
  { title: 'Intermediate', place: 'Sri Chaitanya Jr Kalasala', year: '2024', status: 'completed', detail: '93.3%' },
  { title: 'Secondary School', place: 'Sri Chaitanya Techno School', year: '2022', status: 'completed', detail: '9.7' },
]

export const certifications = [
  'Artificial Intelligence Fundamentals',
  'Data Fundamentals',
  'Introduction to Cybersecurity',
  'Networking Basics',
  'Introduction to Modern AI',
]

// Technologies visualised as nodes orbiting the robot in the 3D world.
// Keep in sync with skillGroups above.
export const techOrbit = [
  { label: 'React', group: 'Frontend', ring: 0, angle: 0.0 },
  { label: 'JavaScript', group: 'Tools', ring: 1, angle: 0.55 },
  { label: 'Node.js', group: 'Backend', ring: 0, angle: 1.1 },
  { label: 'Python', group: 'Data', ring: 2, angle: 1.65 },
  { label: 'MongoDB', group: 'Data', ring: 1, angle: 2.2 },
  { label: 'Express', group: 'Backend', ring: 2, angle: 2.75 },
  { label: 'FastAPI', group: 'Backend', ring: 1, angle: 3.3 },
  { label: 'Tailwind', group: 'Frontend', ring: 2, angle: 3.85 },
  { label: 'Three.js', group: 'Frontend', ring: 0, angle: 4.4 },
  { label: 'Git', group: 'Tools', ring: 2, angle: 4.95 },
  { label: 'BigQuery', group: 'Data', ring: 0, angle: 5.5 },
  { label: 'C++', group: 'Tools', ring: 1, angle: 6.05 },
]

export const groupColors = Object.fromEntries(skillGroups.map((g) => [g.title, g.color]))
