import React, { useState } from "react";
import "../App.css"; // Import shared CSS file if needed

const RecipeCard = ({ recipe, onEdit, onDelete, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
  const [editedRecipe, setEditedRecipe] = useState(recipe); // Editable recipe state
  const [isSelected, setIsSelected] = useState(false); // Track if the recipe is selected

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editedRecipe); // Call the parent edit handler
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setEditedRecipe(recipe); // Reset changes
    setIsEditing(false); // Exit edit mode
  };

  // Handle checkbox selection
  const handleSelect = (e) => {
    const selected = e.target.checked;
    setIsSelected(selected);
    onSelect(recipe.id, selected); // Notify parent about selection change
  };

  return (
    <div
      className="recipe-card"
      onMouseEnter={() => setIsHovered(true)} // Set hover to true when mouse enters
      onMouseLeave={() => setIsHovered(false)} // Set hover to false when mouse leaves
    >
      <div className="card-header">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleSelect}
          className="recipe-select-checkbox"
        />
        <h2 className="recipe-title">{recipe.title}</h2>
      </div>

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="title"
            value={editedRecipe.title}
            onChange={handleChange}
            placeholder="Recipe Title"
          />
          <textarea
            name="description"
            value={editedRecipe.description}
            onChange={handleChange}
            placeholder="Recipe Description"
          />
          <textarea
            name="ingredients"
            value={editedRecipe.ingredients.join(", ")}
            onChange={(e) =>
              setEditedRecipe({
                ...editedRecipe,
                ingredients: e.target.value.split(",").map((i) => i.trim()),
              })
            }
            placeholder="Ingredients (comma-separated)"
          />
          <textarea
            name="steps"
            value={editedRecipe.steps.join(", ")}
            onChange={(e) =>
              setEditedRecipe({
                ...editedRecipe,
                steps: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            placeholder="Steps (comma-separated)"
          />
          <select
            id="difficulty"
            name="difficulty"
            size="4"
            value={editedRecipe.difficulty}
            onChange={handleChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <input
            type="text"
            name="tags"
            value={editedRecipe.tags.join(", ")}
            onChange={(e) =>
              setEditedRecipe({
                ...editedRecipe,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
            placeholder="Tags (comma-separated)"
          />
          <div className="edit-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
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

          {isHovered && (
            <div className="hover-actions">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => onDelete(recipe)}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecipeCard;