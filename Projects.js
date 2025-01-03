// Projects.js
import React from "react";

function Projects() {
  const projects = [
    {
      title: "Personal Website",
      description: "A personal website built using HTML, CSS, and JavaScript.",
      link: "https://github.com/username/personal-website",
    },
    {
      title: "Recipe App",
      description: "A React-based recipe app to explore and share recipes.",
      link: "https://github.com/username/recipe-app",
    },
    {
      title: "Portfolio Project",
      description:
        "A project portfolio showcasing all web development projects.",
      link: "https://github.com/username/portfolio",
    },
  ];

  return (
    <div className="projects-list">
      {projects.map((project, index) => (
        <div key={index} className="project-card">
          <h4>{project.title}</h4>
          <p>{project.description}</p>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      ))}
    </div>
  );
}

export default Projects;
