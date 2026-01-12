# Recipe Manager App

## Overview

The Recipe Manager App is a React-based application that allows users to manage recipes with features such as creating, viewing, editing, deleting, and organizing recipes. The app interacts with a `json-server` to persist data.

---

## Features

### Core Functionality

1. **Home Page**

   * Welcome message and app introduction.
   * "Featured Recipe" section showcasing a popular or new recipe.
   * Brief overview of all projects completed during the Web and Mobile Development 1 course with external links.

2. **Recipe Page**

   * Display recipes with attributes:

     * Title
     * Description
     * Ingredients
     * Preparation steps
     * Tags (e.g., "Dessert", "Vegetarian")
     * Difficulty level
     * Last updated date/time
   * Recipe management:

     * Add new recipes.
     * Edit and update recipes.
     * Delete recipes.
   * Additional features:

     * Search recipes by title, description, or ingredients.
     * Filter recipes by tags and difficulty level.
     * Sort recipes by title, creation time, update time, tags, and difficulty level.

3. **Contact Page**

   * Simple form for users to send messages with subject, email address, and content.
   * Messages are sent to the `json-server` endpoint for storage.

### Bonus Features (Optional)

* Share recipes via JSON format over email.
* Drag-and-drop functionality to rearrange recipes, persisting changes to the server.
* Pagination or infinite scrolling for recipe lists.

---

## Prerequisites

* Node.js and npm installed on your system.
* A code editor (e.g., Visual Studio Code).
* API client (e.g., Postman, Insomnia) for testing endpoints.

---

## Getting Started

### Clone the Repository

```bash
git clone <repository-link>
cd recipe-manager-app
```

### Install Dependencies

```bash
npm install
```

---

## Setting Up the JSON Server

### Install JSON Server

```bash
npm install -g json-server
```

### Start the JSON Server

1. Navigate to the `server` folder:

   ```bash
   cd server
   ```
2. Create a `db.json` file with the following structure:

   ```json
   {
     "recipes": [],
     "messages": []
   }
   ```
3. Run the JSON server:

   ```bash
   json-server --watch db.json --port 3000
   ```

### Test JSON Server Endpoints

* **Get Recipes**: `GET http://localhost:3000/recipes`
* **Add Recipe**: `POST http://localhost:3000/recipes`
* **Edit Recipe**: `PUT http://localhost:3000/recipes/:id`
* **Delete Recipe**: `DELETE http://localhost:3000/recipes/:id`
* **Send Message**: `POST http://localhost:3000/messages`

---

## Running the React Application

### Start the React App

1. Navigate to the project root:

   ```bash
   cd recipe-manager-app
   ```
2. Start the development server:

   ```bash
   npm start
   ```
3. Open the app in your browser:

   ```
   http://localhost:3001
   ```

### Key Pages

* **Home**: Introduction, featured recipe, and course projects.
* **Recipes**: Full recipe management (CRUD operations, search, filter, sort).
* **Contact**: Form to send messages.

---

## Deployment

### Deploying to GitHub Pages

1. Install `gh-pages`:

   ```bash
   npm install gh-pages --save-dev
   ```
2. Add the following to `package.json`:

   ```json
   "homepage": "http://<username>.github.io/recipe-manager-app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Deploy:

   ```bash
   npm run deploy
   ```

---

## Testing

1. Use an API client like Postman to test `json-server` endpoints.
2. Verify all app functionalities manually:

   * CRUD operations for recipes.
   * Search, filter, and sort functionalities.
   * Message submission to the server.

---

## Contribution Guidelines

1. Create a new branch for each feature.
2. Commit changes daily with meaningful messages.
3. Submit pull requests for review before merging.

---

## Report Submission

1. Include a Word document explaining the purpose of each React component, hooks used, and functionality.
2. Attach a zip file containing:

   * Source code.
   * README file.
   * Link to the deployed website.

---

## Troubleshooting

* **JSON Server Not Running**: Ensure `db.json` exists and is properly structured.
* **API Calls Failing**: Check endpoint URLs and server port.
* **Styling Issues**: Inspect the CSS rules and component structure.
