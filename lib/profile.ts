export const profile = {
  name: "Luis Guillermo Pérez Rubio",
  initials: "LGP",
  logo: "LGPR",
  avatar: "/luisperez.jpg", // Puedes cambiar la imagen en public/luisperez.jpg
  role: "Ingeniero de Sistemas | Desarrollador Full-Stack (Backend Focus)",
  email: "luisperez0644@gmail.com",
  location: "Montería, Córdoba, Colombia",
  status: "available" as "available" | "busy",
  bio: [
    "Ingeniero de Sistemas y Desarrollador Full-Stack con fuerte inclinación hacia el desarrollo Backend, la arquitectura modular y los lenguajes fuertemente tipados como TypeScript y Java.",
    "Apasionado por diseñar software mantenible y escalable utilizando marcos modernos como NestJS y Spring Boot, así como monolitos bien estructurados con PHP (Laravel). Me especializo en el modelado de bases de datos relacionales, siendo PostgreSQL mi motor favorito, sin dejar de lado la gestión eficiente con MySQL.",
    "Aunque mi núcleo fuerte está en el servidor, construyo experiencias Frontend completas y fluidas utilizando Vue.js, React, Next.js y Tailwind CSS, ofreciendo así una visión integral en todo el ciclo de vida del desarrollo.",
  ],
  stats: {
    years: 1,
    projects: 3,
    //cuenta las skills y coloca cuantas manejo
    technologies: 15,
    coffees: 612,
  },
  skills: {
    Lenguajes: ["TypeScript", "JavaScript", "Java", "PHP", "SQL", "HTML5", "CSS3"],
    Frontend: ["React", "Next.js", "Tailwind CSS", "Vue.js"],
    Backend: ["Node.js", "NestJS", "Laravel", "Springboot"],
    "Bases De Datos": ["PostgreSQL", "MySQL", "Firebase", "MongoDB"],
    DevOps: ["Git", "Docker", "Kubernetes"],
  },
  certificates: [
    {
      date: "Ago 2026",
      title: "NestJS + Microservicios: Aplicaciones escalables y modulares",
      issuer: "Udemy",
      detail: "Instructores: Fernando Herrera, {d/t} - DevTalles",
      link: "https://ude.my/UC-d610ee3f-e643-4741-8992-7de842abe5d6",
      image: "/certificates/nestjs+microservicios.jpg", // Coloca la ruta ej: "/certificates/nestjs-microservicios.jpg"
    },
    {
      date: "Mar 2026",
      title: "Curso de Backend con NestJS",
      issuer: "Platzi",
      detail: "Instructor: Nicolas Molina",
      link: "https://platzi.com/p/luisperez0644563/curso/12215-nestjs/diploma/detalle/",
      image: "/certificates/nestjs.png",
    },
    {
      date: "Ene 2026",
      title: "Fundamentos de Node.js",
      issuer: "Platzi",
      detail: "Instructor: Oscar Barajas Tavares",
      link: "https://platzi.com/p/luisperez0644563/curso/11982-nodejs/diploma/detalle/",
      image: "/certificates/nodejs.png",
    },
    {
      date: "Ene 2026",
      title: "Fundamentos de JavaScript",
      issuer: "Platzi",
      detail: "Instructores: Diego De Granda, Estefany Aguilar",
      link: "https://platzi.com/p/luisperez0644563/curso/10266-javascript/diploma/detalle/",
      image: "/certificates/javascript.png",
    },
  ],
  education: {
    institution: "Universidad de Córdoba",
    degree: "Ingeniería de Sistemas",
    gpa: "4.1 / 5.0",
    period: "Oct 2021 – Jun 2026",
  },
  languages: [
    { lang: "Español", level: "Nativo" },
    { lang: "Inglés", level: "A2" },
  ],
  social: {
    github: "https://github.com/luisgperezrubio",
    linkedin: "https://linkedin.com/in/luis-guillermo-perez-rubio",
    x: "https://x.com/luisgperezrubio",
  },
};
