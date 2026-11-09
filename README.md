# Adam Mechaeil | Full Stack Developer

Welcome to my personal portfolio repository. This project is a highly-interactive, full-stack web application built to showcase my skills, projects, and professional experience.

![Adam Mechaeil logo](/public/logo.png)

## 🚀 Tech Stack

This portfolio is built with the following technologies:

- **Framework**: [Next.js 16.2.9](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Aceternity UI](https://ui.aceternity.com/) and [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database (Contact Form)**: PostgreSQL + [Prisma ORM](https://www.prisma.io/)
- **Deployment**: [Vercel](https://vercel.com)

## ✨ Key Features

- **Glassmorphism & Dark Mode**: A sleek, modern aesthetic utilizing heavy background blurs, glowing accents, and dynamic gradients.
- **Advanced Micro-Interactions**: Complex animations powered by Framer Motion, including tracing beams and a mouse-tracking background.
- **Serverless Contact Flow**: A fully functional, stateful contact modal that securely saves messages directly to a PostgreSQL database via Server Actions.
- **Typed Throughout**: Strict TypeScript across the whole project.

## 🛠️ Local Development

To run this project locally on your machine:

1. **Clone the repository**

   ```bash
   git clone https://github.com/AdamMechaeil/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env` in the root directory and set your PostgreSQL database URL:

   ```env
   DATABASE_URL="postgres://user:password@host:5432/dbname"
   ```

4. **Sync the database**

   ```bash
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📬 Contact

If you'd like to reach out for a project, collaboration, or just to say hi, feel free to use the Contact Modal on the live site, or hit me up on [LinkedIn](https://www.linkedin.com/in/adam-mechaeil-763294194/).

---

_Designed & Developed by Adam Mechaeil_
