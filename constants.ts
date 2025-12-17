import { Project, Experience, Skill } from './types';

export const RESUME_DATA = {
  name: "Prasan Mishra",
  title: "Full Stack Software Engineer",
  bio: " Software engineer with 2 years of professional experience building scalable web applications. I specialize in the React ecosystem and cloud-native architectures. I love solving complex problems and turning ideas into beautiful, functional products.",
  location: "Gurugram, India",
  email: "prasanmishra330@gmail.com",
  socials: {
    github: "https://github.com/Binary0-1",
    linkedin: "https://linkedin.com/in/prasan-mishra",
    twitter: "https://twitter.com/PrasanMishra",
  }
};

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Software Engineer",
    company: "TechNova Solutions",
    period: "2023 - Present",
    description: [
      "Developed and maintained critical features for a high-traffic SaaS platform using React, TypeScript, and Node.js.",
      "Optimized database queries in PostgreSQL, reducing API latency by 40%.",
      "Collaborated with design and product teams to implement a new design system, improving UI consistency across the app.",
      "Mentored junior developers and conducted code reviews to ensure code quality."
    ]
  },
  {
    id: 2,
    role: "Junior Web Developer",
    company: "Creative Pulse Agency",
    period: "2022 - 2023",
    description: [
      "Built responsive marketing websites for diverse clients using Next.js and Tailwind CSS.",
      "Integrated third-party APIs (Stripe, Contentful) to enhance website functionality.",
      "Implemented automated testing pipelines using Jest and Cypress, increasing deployment reliability.",
      "Participated in agile ceremonies and sprint planning sessions."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "EcoTrack Analytics",
    description: "A real-time dashboard for monitoring environmental sensors. Visualizes data using D3.js and Recharts with a Node.js backend.",
    tags: ["React", "TypeScript", "D3.js", "Node.js", "WebSockets"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=1"
  },
  {
    id: 2,
    title: "TaskFlow Pro",
    description: "A collaborative project management tool featuring drag-and-drop kanban boards, real-time updates, and team chat.",
    tags: ["Next.js", "Firebase", "Tailwind", "Zustand"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=2"
  },
  {
    id: 3,
    title: "DevUI Kit",
    description: "An open-source React component library focused on accessibility and dark mode support. Used by over 500 developers.",
    tags: ["React", "Storybook", "NPM", "A11y"],
    link: "#",
    github: "#",
    image: "https://picsum.photos/600/400?random=3"
  }
];

export const SKILLS: Skill[] = [
  { name: "React/Next.js", level: 90, category: "Frontend" },
  { name: "TypeScript", level: 85, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "PostgreSQL", level: 75, category: "Backend" },
  { name: "Docker", level: 70, category: "Tools" },
  { name: "AWS", level: 65, category: "Tools" },
  { name: "Communication", level: 90, category: "Soft Skills" },
  { name: "Problem Solving", level: 85, category: "Soft Skills" },
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant for Alex Sterling's personal portfolio website.
Your role is to answer questions about Alex's professional background, skills, and projects in a friendly, professional, and concise manner.

Here is Alex's Resume Context:
Name: ${RESUME_DATA.name}
Title: ${RESUME_DATA.title}
Bio: ${RESUME_DATA.bio}
Location: ${RESUME_DATA.location}
Contact: ${RESUME_DATA.email}

Experience:
${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description.join(' ')}`).join('\n')}

Projects:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.tags.join(', ')})`).join('\n')}

Skills:
${SKILLS.map(s => `${s.name} (${s.category})`).join(', ')}

Guidelines:
- Keep answers brief and relevant.
- If asked about something not in the context, politely say you don't have that information but suggest contacting Alex directly.
- Use a professional yet approachable tone.
- Do not make up facts.
`;
