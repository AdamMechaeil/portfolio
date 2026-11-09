# Adam Mechaeil | Full Stack Engineer

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
- **Auth (Private Dashboard)**: [Auth.js](https://authjs.dev/) with Google sign-in
- **Analytics**: [Vercel Analytics](https://vercel.com/docs/analytics) (cookie-free)
- **Deployment**: [Vercel](https://vercel.com)

## ✨ Key Features

- **Glassmorphism & Dark Mode**: A sleek, modern aesthetic utilizing heavy background blurs, glowing accents, and dynamic gradients.
- **Advanced Micro-Interactions**: Complex animations powered by Framer Motion, including tracing beams and a mouse-tracking background.
- **Safer Contact Flow**: A contact modal that validates input on the server, drops bot submissions with a hidden trap field, limits each visitor to 3 messages per 10 minutes, and saves messages to PostgreSQL via Server Actions.
- **Private Dashboard**: `/admin` ("Comms Log") is protected by Google sign-in for a single allowed account. Read messages, mark them read or unread, and delete them. It is hidden from search engines.
- **Intro That Respects You**: A 4-second signature intro plays once per browser session, can be skipped, and is skipped for visitors who prefer reduced motion.
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
   Copy `.env.example` to `.env` in the root directory and fill it in:

   ```env
   DATABASE_URL="postgres://user:password@host:5432/dbname"

   # Only needed for the /admin dashboard
   ADMIN_EMAIL="you@example.com"
   AUTH_SECRET="a-long-random-string"
   AUTH_GOOGLE_ID="from Google Cloud Console"
   AUTH_GOOGLE_SECRET="from Google Cloud Console"
   ```

   Generate `AUTH_SECRET` with `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`. Create the Google credentials under APIs & Services, Credentials, as a Web application, and add `http://localhost:3000/api/auth/callback/google` (and your live address) as an authorized redirect URI. Without these settings the site works normally and `/admin` simply says sign-in is not set up.

4. **Sync the database**

   ```bash
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ⚡ Performance

Measured with Lighthouse (mobile preset, lab conditions) on 2026-11-10: median of three runs on a local production build, against three runs on the previous live version.

| | Previous version | Now |
| --- | --- | --- |
| Performance | 45 | 52 |
| Accessibility | 92 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |
| First contentful paint | about 2.2 s | about 1.1 s |
| Page weight (first visit) | about 5.4 MB | about 2.0 MB |

These are lab numbers from one machine and vary from run to run. The remaining performance cost is mostly the hero's blur and filter effects, which are part of the design.

## 📬 Contact

If you'd like to reach out for a project, collaboration, or just to say hi, feel free to use the Contact Modal on the live site, or hit me up on [LinkedIn](https://www.linkedin.com/in/adam-mechaeil-763294194/).

---

_Designed & Developed by Adam Mechaeil_
