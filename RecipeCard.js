import React, { useState } from "react";
import "../App.css"; // Import shared CSS file if needed

const RecipeCard = ({ recipe, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status

  return (
    <div
      className="recipe-card"
      onMouseEnter={() => setIsHovered(true)} // Set hover to true when mouse enters
      onMouseLeave={() => setIsHovered(false)} // Set hover to false when mouse leaves
    >
      <h2 className="recipe-title">{recipe.title}</h2>
      <p className="recipe-description">{recipe.description}</p>
      <h4>Ingredients:</h4>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Preparation Steps:</h4>
      <ol className="steps-list">
        {(recipe.steps || []).map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="tags">
        {recipe.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p className="difficulty">Difficulty: {recipe.difficulty}</p>
      <p className="last-updated">Last Updated: {recipe.lastUpdated}</p>

      {/* Show edit and delete buttons on hover */}
      {isHovered && (
        <div className="hover-actions">
          <button onClick={() => onEdit(recipe)}>Edit</button>
          <button onClick={() => onDelete(recipe)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
