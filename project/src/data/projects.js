const projects = [
  {
    id: "Library Management System",
    title: "Library Management System",
    description:
      "A simple web app to efficiently manage library books with basic CRUD operations and search functionality.",
    longDescription:
      "The Library Management System is a user-friendly web application designed to simplify the management of books in a library. Users can add, edit, delete, and search for books quickly. The system displays the records in a sortable table for better organization and easy access. While it is simple, it demonstrates the implementation of CRUD operations, search and sort functionality, and responsive UI design, making it a practical project to showcase foundational web development skills.",
    image: "/LibMngmt1.png",
    images: ["/LibMngmt1.png", "/LibMngmt2.png"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Add new books with complete details",
      "Edit and update existing book records",
      "Delete outdated or unnecessary books",
      "Search books by name for quick access",
      "Sort books by different parameters in the table",
      "Clean and responsive UI design for desktops and tablets",
    ],
    challenges:
      "Designing a responsive and user-friendly interface while maintaining clear and efficient CRUD operations.",
    demoLink: "https://dsa-lib-sys.vercel.app/",
    githubLink: "https://github.com/WarishAli1/DSA-LibSys",
  },
  {
    id: "Student CRM System",
    title: "Student CRM System",
    description:
      "A CRM web application developed under Raise Tech Pvt. Ltd. to manage and track student visa processes efficiently.",
    longDescription:
      "The Student CRM System is a full-stack web application developed during my internship at Raise Tech Pvt. Ltd. It helps abroad study consultancies manage and track students' visa progress—from initial application to offer letter and final visa approval. The project was initially set up by the senior, who provided a basic frontend and backend structure. Building upon that foundation, I implemented the majority of the system’s core functionalities, including student data management, progress tracking, and authentication logic. I also researched and integrated an OTP-based login and password reset system, improving both security and usability. This project represents real-world experience working in a company environment, following guidance while independently developing and enhancing key modules.",
    image: "/crm1.png",
    images: ["/crm1.png", "/crm2.png", "/crm3.png", "/crm4.png", "/crm5.png"],
    technologies: [
      "Vue.js",
      "PrimeVue",
      "Java",
      "Spring Boot",
      "MySQL"
    ],
    features: [
      "Student record management with add, edit, and delete options",
      "Stage tracking for offer letters, visa approvals, and enrollments",
      "Dashboard with live graphs and analytics for student progress",
      "OTP-based login and password reset system",
      "Modern, responsive UI with smooth transitions",
      "Role-based access for different consultancy members",
    ],
    challenges:
      "Collaborating on an existing project setup while implementing new modules, integrating secure OTP authentication, and maintaining data consistency between Vue frontend and Spring Boot backend.",
    demoLink: "#", // Add when hosted
    githubLink: "#", // Add your repo link
  },
  {
    id: "Face Recognition App",
    title: "Face Recognition App",
    description:
      "A real-time face recognition system using pre-trained models for fast and accurate detection.",
    longDescription:
      "This Face Recognition App demonstrates real-time face detection and recognition using Python, Streamlit, and PyTorch. Users can add a person's name and photo, and the system will detect and recognize the face with high accuracy in under a second. It leverages pre-trained InceptionResnetV1 and MTCNN models for efficient feature extraction and detection, making it practical for learning purposes. All images and embeddings are stored in Google Drive, enabling persistence across sessions. The project highlights practical usage of computer vision, CNNs, and transfer learning without heavy training requirements.",
    image: "/face5.PNG",
    images: ["/face1.PNG", "/face2.PNG", "/face3.PNG", "/face4.PNG", "/face5.PNG"],
    technologies: ["Python", "Streamlit", "PyTorch", "facenet-pytorch", "OpenCV"],
    features: [
      "Add new users with their name and photo",
      "Accurate and fast real-time face recognition (<1s per frame)",
      "Supports multiple faces in a single frame",
      "Detects and recognizes faces using pre-trained models for efficiency",
      "Stores user images and embeddings in Google Drive for persistence",
      "Demonstrates practical implementation of CNNs and transfer learning",
    ],
    challenges:
      "Integrating pre-trained models with Streamlit for real-time recognition while managing data storage in Google Drive.",
    demoLink: "https://face-recognition-project-warish.streamlit.app/",
    githubLink: "https://github.com/WarishAli1/face-recognition-project",
  },
];

export default projects;
