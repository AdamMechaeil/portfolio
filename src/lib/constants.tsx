import { Oswald } from "next/font/google";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBrandX,
} from "@tabler/icons-react";
const getDevicon = (name: string, version: string = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${version}.svg`;
export const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });
export const experienceData = [
  {
    role: "Full Stack Developer and Trainer",
    company: "Techstack",
    location: "Delhi,India",
    date: "December 2023 - January 2026",
    description:
      "Architected a secure, production-grade LMS for 200+ students, featuring JWT-based RBAC and an atomic ID generation system for data integrity. Additionally, automated Google Meet scheduling and attendance tracking, saving the operations team over 10 hours per week.",
    skills: [
      "Next.js",
      "React",
      "Node.js",
      "AWS",
      "System Architecture",
      "Java Core",
      "MYSQL",
      "MongoDb",
      "Docker",
    ],
  },
  {
    role: "Javascript Developer",
    company: "Proses Web Technologies",
    location: "Vadodra Gujrat",
    date: "November 2022 - August 2023",
    description:
      "Optimized legacy React and Express.js applications, boosting Lighthouse performance scores to 92 and reducing load times to under two seconds. Modernized the platform with a responsive Tailwind CSS UI and resolved critical payment gateway bugs to ensure transaction reliability.",
    skills: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MySQL",
      "MongoDb",
      "Node.js",
      "AWS",
      "Docker",
    ],
  },
];

export const wordsHero = [
  {
    text: "Adam",
    className: `${oswald.className} text-5xl md:text-8xl font-bold tracking-tighter uppercase text-white drop-shadow-[0_4px_20px_rgba(0,0,0,1)]`,
  },
  {
    text: "Mechaeil",
    className: `${oswald.className} text-5xl md:text-8xl font-bold tracking-tighter uppercase text-blue-500 drop-shadow-[0_4px_20px_rgba(0,0,0,1)]`,
  },
];

export const projectsData = [
  {
    title: "Modern Sensei",
    description:
      "Multi-tenant Learning Management System which intends to cater institutes of every scale and allow them to handle almost everything required by an Institute, from managing multiple branches,admissions, students, batches to handling CRM easily. ",
    image: "/modernsensei.png",
    mobileAlignment: "object-left-top",
    techStack: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "MongoDb",
      "Express",
      "NodeJs",
    ],
    liveLink: "https://modernsensei.com/",
    githubLink: "",
  },
  {
    title: "Tharoorify",
    description:
      "Tharoorify is a 100% serverless, context-aware Chrome extension that acts as an on-demand dictionary and personal vocabulary logger. By keeping the user in their flow, it eliminates the friction of maintaining a daily revision vocabulary list.",
    image: "/tharoorify.png",
    mobileAlignment: "object-right-top",
    techStack: [
      "React",
      "Vite",
      "OAuth",
      "TypeScript",
      "Chrome API",
      "Tailwind CSS",
    ],
    liveLink: "https://github.com/AdamMechaeil/Tharoorfiy",
    githubLink: "https://github.com/AdamMechaeil/Tharoorfiy",
  },
];

// The Arsenal Array
export const arsenalItems = [
  { name: "React.js", imgSrc: getDevicon("react") },
  { name: "Node.js", imgSrc: getDevicon("nodejs", "original-wordmark") },
  { name: "TypeScript", imgSrc: getDevicon("typescript") },
  { name: "AWS", imgSrc: getDevicon("amazonwebservices", "original-wordmark") },
  { name: "Next.js", imgSrc: getDevicon("nextjs", "original") },
  { name: "Tailwind CSS", imgSrc: getDevicon("tailwindcss") },
  { name: "MongoDB", imgSrc: getDevicon("mongodb", "original-wordmark") },
  { name: "Docker", imgSrc: getDevicon("docker") },
  { name: "Python", imgSrc: getDevicon("python") },
  { name: "Django", imgSrc: getDevicon("django", "plain") },
  { name: "JavaScript", imgSrc: getDevicon("javascript") },
  { name: "MySQL", imgSrc: getDevicon("mysql", "original-wordmark") },
  { name: "Socket.io", imgSrc: getDevicon("socketio") },
  { name: "Redux", imgSrc: getDevicon("redux") },
  { name: "Git", imgSrc: getDevicon("git") },
  { name: "HTML5", imgSrc: getDevicon("html5") },
  { name: "CSS3", imgSrc: getDevicon("css3") },
];

export const Socials = [
  {
    name: "Github",
    link: "https://github.com/Adammechaeil",
    icon: (
      <IconBrandGithub
        className="text-white/70 group-hover:text-emerald-400 relative z-10 transition-colors"
        size={24}
      />
    ),
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/adam-mechaeil-763294194/",
    icon: (
      <IconBrandLinkedin
        className="text-white/70 group-hover:text-emerald-400 relative z-10 transition-colors"
        size={24}
      />
    ),
  },
  {
    name: "YouTube",
    link: "https://youtube.com/",
    icon: (
      <IconBrandYoutube
        className="text-white/70 group-hover:text-emerald-400 relative z-10 transition-colors"
        size={24}
      />
    ),
  },
  {
    name: "X",
    link: "https://x.com/",
    icon: (
      <IconBrandX
        className="text-white/70 group-hover:text-emerald-400 relative z-10 transition-colors"
        size={24}
      />
    ),
  },
];
