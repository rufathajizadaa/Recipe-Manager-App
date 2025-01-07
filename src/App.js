import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import FeaturedRecipe from "./FeaturedRecipe";
import Projects from "./Projects";
import CreateRecipe from "./CreateRecipe";
import RecipeCard from "./components/RecipeCard";
import Contact from "./Contact";
import "./App.css";
import "./styles.css";
import "./contact.css";
import emailjs from "emailjs-com";
import logo from './images/logo3.jpg'; // Import the image

function App() {
  const [recipes, setRecipes] = useState([]); // State to manage recipes
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [selectedTag, setSelectedTag] = useState(""); // State for tag filter
  const [selectedDifficulty, setSelectedDifficulty] = useState(""); // State for difficulty filter
  const [sortOption, setSortOption] = useState(""); // State for sorting option

  const [selectedRecipes, setSelectedRecipes] = useState([]); // State for selected recipes
  const [userEmail, setUserEmail] = useState(""); // State for user's email

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const recipesPerPage = 4; // Number of recipes per page

  const apiUrl = "http://localhost:3000/recipes"; // JSON server API endpoint

  // Fetch recipes from JSON server
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  // Reset current page when filters or sorting change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag, selectedDifficulty, sortOption]);

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

  // Function to edit a recipe
  const handleEdit = (updatedRecipe) => {
    updatedRecipe.lastUpdated = new Date().toLocaleString();

    const cleanArray = (array) =>
      array.map((item) => item.trim()).filter((item) => item !== "");

    updatedRecipe.ingredients = cleanArray(updatedRecipe.ingredients || []);
    updatedRecipe.steps = cleanArray(updatedRecipe.steps || []);
    updatedRecipe.tags = cleanArray(updatedRecipe.tags || []);

    if (updatedRecipe.tags.length > 3) {
      alert("A recipe can have a maximum of 3 tags.");
      return;
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

  // Function to delete a recipe
  const handleDelete = (recipeToDelete) => {
    fetch(`${apiUrl}/${recipeToDelete.id}`, { method: "DELETE" })
      .then(() => {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeToDelete.id)
        );
      })
      .catch((error) => console.error("Error deleting recipe:", error));
  };

  // Function to toggle selection of a recipe
  const toggleSelectRecipe = (recipe) => {
    setSelectedRecipes((prev) => {
      // If the recipe is already selected, remove it
      if (prev.some((r) => r.id === recipe.id)) {
        const updated = prev.filter((r) => r.id !== recipe.id);
        console.log("Removed Recipe:", recipe.title);
        console.log("Selected Recipes:", updated);
        return updated;
      }
      // Otherwise, add it to the selected recipes
      const updated = [...prev, recipe];
      console.log("Added Recipe:", recipe.title);
      console.log("Selected Recipes:", updated);
      return updated;
    });
  };

  // Function to share selected recipes via email
  const shareRecipes = () => {
    console.log("Sharing Recipes:", selectedRecipes);

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
      .send("service_748ijwd",
        "template_gr2umce",
        emailParams,
        "72gZg_PTZYQn0Iohw"
      )
      .then(
        () => alert("Recipes shared successfully!"),
        (error) => {
          console.error("Error sending email:", error.text);
          alert("Failed to share recipes. Please try again.");
        }
      );
  };

  // Function to sort recipes
  const sortRecipes = (recipes, sortOption) => {
    if (!sortOption) return recipes; // No sorting if no option selected

    const sortedRecipes = [...recipes]; // Create a copy to avoid mutating state
    switch (sortOption) {
      case "title":
        sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "createTime":
        sortedRecipes.sort(
          (a, b) => new Date(a.createTime) - new Date(b.createTime)
        );
        break;
      case "updateTime":
        sortedRecipes.sort(
          (a, b) => new Date(a.updateTime) - new Date(b.updateTime)
        );
        break;
      case "difficulty":
        const levels = { Easy: 1, Medium: 2, Hard: 3 };
        sortedRecipes.sort(
          (a, b) => levels[a.difficulty] - levels[b.difficulty]
        );
        break;
      default:
        break;
    }
    return sortedRecipes;
  };

  // Filter and sort recipes
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

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
  };

  return (
    <Router>
      <div className="home-page">
        <header className="header">
          <div className="navbar">
            <div className="logo_and_name">
              <img src={logo} alt="RecipeCloud Logo" />
              <h2>
                Welcome to Recipe Manager App!<br />
                Create, organize, and explore recipes with ease.<br />
                Your perfect kitchen companion awaits!
              </h2>

            </div>

            <nav>
              <ul className="nav-links">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/featured"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Featured Recipe
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/create"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Create Recipe
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/projects"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Our Projects
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Contact Us
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <section className="recipe-list">
                {/* Search, Filter, Sort Section */}
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

                {/* Share Recipes Section */}
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

                {/* Recipe Grid */}
                <div className="recipe-grid">
                  {currentRecipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id} // Use unique ID as key
                      recipe={recipe}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      isSelected={selectedRecipes.some((r) => r.id === recipe.id)}
                      onSelect={() => toggleSelectRecipe(recipe)}
                    />
                  ))}
                </div>

                {/* Pagination Section */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`pagination-button ${currentPage === index + 1 ? "active" : ""
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                    >
                      Next
                    </button>
                  </div>
                )}
              </section>
            }
          />
          <Route path="/featured" element={
            <section className="featured-recipe">
              <h3>Featured Recipe</h3>
              <h6>Explore the most recently added recipe, handpicked just for you!</h6>
              {recipes.length > 0 ? (
                <FeaturedRecipe recipe={recipes[recipes.length - 1]} />
              ) : (
                <p>No recipes available yet. Start adding your favorite recipes!</p>
              )}
            </section>
          } />
          <Route path="/projects" element={
            <div className="projects">
              <h2>Our Projects</h2>
              <Projects />
            </div>
          } />
          <Route path="/create" element={
            <section className="create-recipe-section">
              <CreateRecipe addRecipe={addRecipe} />
            </section>
          } />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// json-server --watch db.json --port 3000
