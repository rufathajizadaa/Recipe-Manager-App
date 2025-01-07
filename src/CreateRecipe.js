import React, { useState } from "react";
import "./App.css";
import "./styles.css";
import "./contact.css";

function CreateRecipe({ addRecipe }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    tags: "",
    difficulty: "Easy",
  });

  // const [lastUpdated, setLastUpdated] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split tags and trim whitespace, then sort them in ascending order
    const tagsArray = formData.tags
      ? formData.tags.split(",").map((tag) => tag.trim().toLowerCase()).sort()
      : [];

    // Check if there are more than 3 tags
    if (tagsArray.length > 3) {
      alert("You can only add a maximum of 3 tags.");
      return;
    }

    // Split ingredients and steps, trim whitespace, and sort them in ascending order
    const ingredientsArray = formData.ingredients
      ? formData.ingredients
        .split(",")
        .map((ingredient) => ingredient.trim())
        .filter((ingredient) => ingredient) // Filter out any empty strings caused by trailing commas
        .sort()
      : [];

    const stepsArray = formData.steps
      ? formData.steps
        .split(",")
        .map((step) => step.trim())
        .filter((step) => step) // Filter out any empty strings caused by trailing commas
        .sort()
      : [];

    const newRecipe = {
      ...formData,
      ingredients: ingredientsArray,
      steps: stepsArray,
      tags: tagsArray,
      lastUpdated: new Date().toLocaleString(), // Add the last updated timestamp
    };

    addRecipe(newRecipe);

    // setLastUpdated(newRecipe.lastUpdated);

    // Reset the form
    setFormData({
      title: "",
      description: "",
      ingredients: "",
      steps: "",
      tags: "",
      difficulty: "Easy",
    });
  };

  return (
    <div className="create-recipe">
      <h2>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Recipe Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Recipe Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Recipe Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="ingredients">Ingredients (comma-separated):</label>
        <textarea
          id="ingredients"
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="steps">Steps (comma-separated):</label>
        <textarea
          id="steps"
          name="steps"
          placeholder="Steps (comma-separated)"
          value={formData.steps}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="tags">Tags (comma-separated, max 3 tags):</label>
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleInputChange}
        />

        <label htmlFor="difficulty">Difficulty Level:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleInputChange}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;