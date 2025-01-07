// FeaturedRecipe.js
import React, { useEffect, useState } from "react";
import "./App.css";
import "./styles.css";
import "./contact.css";

function FeaturedRecipe() {
  const [featuredRecipe, setFeaturedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = () => {
      fetch("http://localhost:3000/recipes") // Update the URL based on your JSON server
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch recipes");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.length > 0) {
            setFeaturedRecipe(data[data.length - 1]);
          } else {
            setFeaturedRecipe(null); // Handle case when no recipes are available
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    fetchRecipes(); // Initial fetch
    const interval = setInterval(fetchRecipes, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (!featuredRecipe) {
    return <p>No featured recipe available.</p>; // Handle no data state
  }

  return (
    <div className="featured-recipe-card">
      <h2 className="recipe-title">{featuredRecipe.title}</h2>
      <p className="recipe-description">{featuredRecipe.description}</p>
      <h4>Ingredients:</h4>
      <ul className="ingredients-list">
        {featuredRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Preparation Steps:</h4>
      <ol className="steps-list">
        {(featuredRecipe.steps || []).map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="tags">
        {featuredRecipe.tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
      <p className="difficulty">Difficulty: {featuredRecipe.difficulty}</p>
      <p className="last-updated">Last Updated: {featuredRecipe.lastUpdated}</p>
    </div>
  );
}

export default FeaturedRecipe;
