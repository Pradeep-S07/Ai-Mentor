export const fallbackRoadmaps = [
  {
    role: 'Frontend Developer',
    description: 'Master modern web development with React and create stunning user interfaces',
    steps: [
      {
        step: 1,
        title: 'Master HTML, CSS & JavaScript Fundamentals',
        description: 'Build a strong foundation in core web technologies. Learn semantic HTML, modern CSS including Flexbox and Grid, and ES6+ JavaScript features.',
        resources: [
          'https://developer.mozilla.org/en-US/docs/Learn',
          'https://javascript.info/',
          'https://css-tricks.com/guides/'
        ]
      },
      {
        step: 2,
        title: 'Learn React & Modern Frontend Frameworks',
        description: 'Dive into React fundamentals, hooks, state management, and component architecture. Understand virtual DOM and build interactive applications.',
        resources: [
          'https://react.dev/learn',
          'https://www.freecodecamp.org/learn/front-end-development-libraries/',
          'https://www.youtube.com/watch?v=bMknfKXIFA8'
        ]
      },
      {
        step: 3,
        title: 'Build Real-World Projects & Portfolio',
        description: 'Apply your skills by building full-featured applications. Create a portfolio showcasing responsive designs, API integration, and modern tooling.',
        resources: [
          'https://www.frontendmentor.io/',
          'https://github.com/florinpop17/app-ideas',
          'https://www.freecodecamp.org/news/portfolio-app-using-react-618814e35843/'
        ]
      }
    ]
  },
  {
    role: 'DevOps Engineer',
    description: 'Learn infrastructure automation, containerization, and cloud deployment practices',
    steps: [
      {
        step: 1,
        title: 'Master Linux & Command Line Essentials',
        description: 'Gain proficiency in Linux administration, shell scripting, networking fundamentals, and system monitoring tools.',
        resources: [
          'https://www.linux.org/forums/#linux-tutorials.122',
          'https://www.freecodecamp.org/news/the-linux-commands-handbook/',
          'https://linuxjourney.com/'
        ]
      },
      {
        step: 2,
        title: 'Learn Docker & Kubernetes',
        description: 'Master containerization with Docker, orchestration with Kubernetes, and microservices architecture patterns.',
        resources: [
          'https://docs.docker.com/get-started/',
          'https://kubernetes.io/docs/tutorials/',
          'https://www.freecodecamp.org/news/the-kubernetes-handbook/'
        ]
      },
      {
        step: 3,
        title: 'Implement CI/CD Pipelines & Cloud Platforms',
        description: 'Set up automated deployment pipelines using Jenkins, GitHub Actions, or GitLab CI. Learn AWS, Azure, or GCP cloud services.',
        resources: [
          'https://www.jenkins.io/doc/tutorials/',
          'https://docs.github.com/en/actions/quickstart',
          'https://aws.amazon.com/getting-started/'
        ]
      }
    ]
  },
  {
    role: 'Full Stack Developer',
    description: 'Become proficient in both frontend and backend development with modern tech stacks',
    steps: [
      {
        step: 1,
        title: 'Frontend Development with React',
        description: 'Master React, JavaScript, state management, and modern CSS frameworks like Tailwind CSS.',
        resources: [
          'https://react.dev/learn',
          'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          'https://tailwindcss.com/docs'
        ]
      },
      {
        step: 2,
        title: 'Backend Development with Node.js',
        description: 'Learn Node.js, Express, RESTful APIs, authentication, and database design with MongoDB or PostgreSQL.',
        resources: [
          'https://nodejs.org/en/docs/',
          'https://expressjs.com/en/starter/installing.html',
          'https://www.mongodb.com/docs/'
        ]
      },
      {
        step: 3,
        title: 'Deploy Full Stack Applications',
        description: 'Learn deployment strategies, cloud hosting, database management, and monitoring for production applications.',
        resources: [
          'https://vercel.com/docs',
          'https://www.digitalocean.com/community/tutorials',
          'https://www.heroku.com/'
        ]
      }
    ]
  }
];

export function getFallbackRoadmap(role) {
  const normalizedRole = role.toLowerCase().trim();
  return fallbackRoadmaps.find(
    roadmap => roadmap.role.toLowerCase() === normalizedRole
  ) || null;
}
