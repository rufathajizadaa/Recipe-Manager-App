// Projects.js
import React from "react";

import "./App.css";
import "./styles.css";
import "./contact.css";

function Projects() {
  const projects = [
    {
      title: "Biography Webpage",
      description: "A personal website built by Rufat Hajizada using HTML, CSS.",
      link: "https://github.com/rufathajizadaa/Web-Mobile-1-/tree/main/Biography%20Webpage",
    },
    {
      title: "Portfolio Project",
      description:
      "A project portfolio showcasing all web development projects by Shamil Abbasov.",
      link: "https://github.com/Shamil16084/Personal_Webpage",
    },
    {
      title: "Auto Form Filler",
      description: "A Chrome extension that auto-fills job applications using LinkedIn data with customizable fields.Developed by Rufat Hajizada, Shamil Abbasov, and Azar Shukurlu",
      link: "https://github.com/Shamil16084/Chrome_Extension",
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
