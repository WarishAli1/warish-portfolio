const projects = [
  {
    id: "Ferris Nepal(E-Commerce)",
    title: "Ferris Nepal(E-Commerce)",
    description:
      "A full-featured e-commerce platform with product listings, shopping cart, and user authentication.",
    longDescription:
      "This e-commerce platform provides businesses with a complete solution to sell products online. It features a responsive design, product search and filtering, user accounts, shopping cart functionality, secure checkout with Stripe integration, and an admin dashboard for managing products and orders.",
    image: "ferrisnepal.jpg",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    technologies: ["Html", "Css", ,],
    features: [
      "Responsive product catalog with search and filtering",

      "Shopping cart with persistent storage",

      "Admin dashboard for product and order management",
    ],
    challenges: "Implementing a responsive design.",
    demoLink: "https://example-ecommerce.com",
    githubLink: "https://github.com/yourusername/ecommerce-platform",
  },
  {
    id: "Hospital Management System",
    title: "Hospital Management System",
    description:
      "A collaborative task management application with real-time updates, task assignments, and progress tracking.",
    longDescription:
      "This task management application helps teams organize and track their work efficiently. It features a drag-and-drop interface for managing tasks across different stages, real-time updates using WebSockets, task assignments with notifications, due date tracking, and detailed analytics to measure team productivity.",
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    technologies: ["Python", "Tkinter"],
    features: [
      "Real-time updates and collaboration",
      "Task assignments and notifications",
      "Due date tracking and reminders",
      "File attachments and comments",
      "Performance analytics and reporting",
    ],
    challenges:
      "Implementing real-time synchronization across multiple users was challenging.",
    demoLink: "https://example-taskmanager.com",
    githubLink: "https://github.com/yourusername/task-management-app",
  },
  {
    id: "Smile Ticket",
    title: "Smile Ticket",
    description: "The project where bus ticket is managed by face recognition.",
    longDescription:
      "The project where bus ticket is managed by face recognition. The travel is made easier.",
    image: "Blue_logo.png",
    images: [
      "/smileticket.png/",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579126038374-6064e9370f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    ],
    technologies: ["React", "MySQL", "Python"],
    features: ["Ticket management system"],
    challenges:
      "Creating an intuitive user experience while handling complex data visualization was challenging. I used React Native for a native-like experience and D3.js for creating interactive and informative charts.",
    demoLink: "https://example-fitnesstracker.com",
    githubLink: "https://github.com/yourusername/fitness-tracking-app",
  },
];

export default projects;
