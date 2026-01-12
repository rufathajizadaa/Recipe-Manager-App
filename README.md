# Recipe Manager App

A full-stack React application for creating, managing, and organizing recipes with persistent storage using a RESTful JSON API. The platform enables users to add, edit, delete, search, filter, and sort recipes in a clean and intuitive interface.

This project is designed with modular components, scalable API integration, and a user-focused experience in mind.

---

## 🚀 Features

### Recipe Management
- Create, edit, and delete recipes
- Automatic timestamp updates on creation and modification
- Persistent storage using JSON Server
- Real-time UI updates after API operations

### Recipe Structure
Each recipe includes:
- Title
- Description
- Ingredients (list)
- Preparation steps
- Tags (e.g., `Dessert`, `Vegetarian`, `Quick`)
- Difficulty level (`Easy`, `Medium`, `Hard`)
- Last updated date/time

### Browsing & Organization
- Search by title, description, or ingredients
- Filter by tags and difficulty level
- Sort by:
  - Title
  - Creation time
  - Last updated time
  - Difficulty level
- Featured recipe section

### Contact System
- Contact form for user messages
- Messages are stored via the backend API

### Optional Enhancements
- Drag-and-drop recipe reordering with persistence
- Pagination / infinite scrolling
- Share selected recipes via JSON payload

---

## 🛠️ Tech Stack

### Frontend
- **React** (Functional Components & Hooks)
- **Axios** for API communication
- **CSS / Custom Styling**

### Backend (Mock API)
- **JSON Server**
- RESTful endpoints for recipes and messages
