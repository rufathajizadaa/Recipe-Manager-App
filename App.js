import React, { useState, useEffect } from "react";
import FeaturedRecipe from "./FeaturedRecipe";
import Projects from "./Projects";
import CreateRecipe from "./CreateRecipe";
import RecipeCard from "./components/RecipeCard";
import Contact from "./Contact";
import "./App.css";
import "./styles.css";
import "./contact.css";
import emailjs from "emailjs-com";


function App() {
  const [recipes, setRecipes] = useState([]); // State to manage recipes
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedTag, setSelectedTag] = useState(""); // State for tag filter
  const [selectedDifficulty, setSelectedDifficulty] = useState(""); // State for difficulty filter
  const [sortOption, setSortOption] = useState(""); // State for sorting option

  const [selectedRecipes, setSelectedRecipes] = useState([]); // **State for selected recipes**
  const [userEmail, setUserEmail] = useState(""); // **State for user's email**


  const apiUrl = "http://localhost:3000/recipes"; // JSON server API endpoint

  // Fetch recipes from JSON server
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  // Function to add a new recipe
  const addRecipe = (newRecipe) => {
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => response.json())
      .then((savedRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, savedRecipe]);
      })
      .catch((error) => console.error("Error adding recipe:", error));
  };

  // Handle edit recipe
  const handleEdit = (updatedRecipe) => {
    // Add current date and time to `lastUpdated`
    updatedRecipe.lastUpdated = new Date().toLocaleString();

    // Clean arrays for ingredients, steps, and tags
    const cleanArray = (array) =>
      array.map((item) => item.trim()).filter((item) => item !== "");

    updatedRecipe.ingredients = cleanArray(updatedRecipe.ingredients || []);
    updatedRecipe.steps = cleanArray(updatedRecipe.steps || []);
    updatedRecipe.tags = cleanArray(updatedRecipe.tags || []);

    // Enforce a maximum of 3 tags
    if (updatedRecipe.tags.length > 3) {
      alert("A recipe can have a maximum of 3 tags.");
      return; // Stop further execution
    }

    fetch(`${apiUrl}/${updatedRecipe.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRecipe),
    })
      .then((response) => response.json())
      .then((savedRecipe) => {
        setRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.id === savedRecipe.id ? savedRecipe : recipe
          )
        );
      })
      .catch((error) => console.error("Error editing recipe:", error));
  };




  // Handle delete recipe
  const handleDelete = (recipeToDelete) => {
    fetch(`${apiUrl}/${recipeToDelete.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeToDelete.id)
        );
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  };




  const shareRecipes = () => {
    if (selectedRecipes.length === 0) {
      alert("Please select recipes to share.");
      return;
    }

    if (!userEmail) {
      alert("Please enter your email address.");
      return;
    }

    // Convert the email to lowercase for uniformity
    const normalizedEmail = userEmail.trim().toLowerCase();

    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const emailParams = {
      to_email: normalizedEmail,
      recipes: JSON.stringify(selectedRecipes, null, 2),
    };

    emailjs
      .send("service_v52xam9", "template_u43zt9n", emailParams, "AIAe-bsHafs6zrey3")
      .then(
        () => alert("Recipes shared successfully!"),
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to share recipes. Please try again.");
        }
      );
  };







  const sortRecipes = (recipes, sortOption) => {
    if (!sortOption) return recipes; // No sorting if no option selected

    const sortedRecipes = [...recipes]; // Create a copy to avoid mutating state
    switch (sortOption) {
      case "title":
        sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "createTime":
        sortedRecipes.sort((a, b) => new Date(a.createTime) - new Date(b.createTime));
        break;
      case "updateTime":
        sortedRecipes.sort((a, b) => new Date(a.updateTime) - new Date(b.updateTime));
        break;
      case "difficulty":
        const levels = { Easy: 1, Medium: 2, Hard: 3 };
        sortedRecipes.sort((a, b) => levels[a.difficulty] - levels[b.difficulty]);
        break;
      default:
        break;
    }
    return sortedRecipes;
  };

  const filteredRecipes = sortRecipes(
    recipes.filter((recipe) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(query)
        );

      const matchesTag = selectedTag === "" || recipe.tags.includes(selectedTag);

      const matchesDifficulty =
        selectedDifficulty === "" || recipe.difficulty === selectedDifficulty;

      return matchesSearch && matchesTag && matchesDifficulty;
    }),
    sortOption
  );



  // Function to filter recipes
  // const filteredRecipes = recipes.filter((recipe) => {
  //   const query = searchQuery.toLowerCase();
  //   const matchesSearch =
  //     recipe.title.toLowerCase().includes(query) ||
  //     recipe.description.toLowerCase().includes(query) ||
  //     recipe.ingredients.some((ingredient) =>
  //       ingredient.toLowerCase().includes(query)
  //     );

  //   const matchesTag = selectedTag === "" || recipe.tags.includes(selectedTag);

  //   const matchesDifficulty =
  //     selectedDifficulty === "" || recipe.difficulty === selectedDifficulty;

  //   return matchesSearch && matchesTag && matchesDifficulty;
  // });

  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to Recipe Manager App</h1>
        <p>
          This app showcases a variety of delicious recipes. Discover new
          recipes, explore developer's past projects, and learn more about our work.
        </p>
      </header>

      {/* Projects Section */}
      <div className="projects">
        <h2>Our Projects</h2>
        <Projects />
        <Contact />
      </div>

      {/* Featured Recipe Section */}
      <section className="featured-recipe">
        <h3>Featured Recipe</h3>
        <FeaturedRecipe />
      </section>

      {/* Create Recipe Section */}
      <section className="create-recipe-section">
        <CreateRecipe addRecipe={addRecipe} />
      </section>



      {/* Recipe List Section */}
      <section className="recipe-list">
        {/* Search and Filter Section */}
        <section className="search-filter-section">
          <div className="search-filter-div">
            <h2>Explore Recipes</h2>
            <div className="search-bar-container">
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
              />
            </div>
            <div className="filter-container">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">All Tags</option>
                {[...new Set(recipes.flatMap((recipe) => recipe.tags))].map(
                  (tag, index) => (
                    <option key={index} value={tag}>
                      {tag}
                    </option>
                  )
                )}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">All Difficulty Levels</option>
                {[...new Set(recipes.map((recipe) => recipe.difficulty))].map(
                  (difficulty, index) => (
                    <option key={index} value={difficulty}>
                      {difficulty}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="sorting-container">
              <label htmlFor="sortOptions">Sort by: </label>
              <select
                id="sortOptions"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="filter-dropdown"
              >
                <option value="">None</option>
                <option value="title">Title</option>
                <option value="createTime">Create Time</option>
                <option value="updateTime">Update Time</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
          </div>
        </section>

        {/* **Added share button and email input** */}
        <div className="share-recipes-container">
          <input
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="email-input"
          />
          <button onClick={shareRecipes} className="share-button">
            Share Selected Recipes
          </button>
        </div>

        <div className="recipe-grid">
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isSelected={selectedRecipes.includes(recipe)} // **New prop**
              onSelect={() =>
                setSelectedRecipes((prev) =>
                  prev.includes(recipe)
                    ? prev.filter((r) => r !== recipe)
                    : [...prev, recipe]
                )
              }
            />
          ))}
        </div>
      </section>




    </div>
  );
}

export default App;