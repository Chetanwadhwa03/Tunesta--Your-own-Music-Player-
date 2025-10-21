# 🎵 Tunesta - Your Personalized Music Streaming App

Tunesta is a dynamic, full-stack music streaming application built with the MERN stack (MongoDB - *in progress*, Express, React, Node.js). It features a modern, responsive UI with ambient effects and fetches album/song data from a dedicated backend API.

**Live Site:** [**https://tunesta.netlify.app/**](https://tunesta.netlify.app/)

---

## 🚀 Live Demo

![Tunesta Demo](./demo/Tunesta-demo.gif)


---

## ✨ Key Features

* **Full-Stack Architecture:** Frontend built with **React** (using Vite), backend powered by **Node.js** and **Express**.
* **Dynamic Data Loading:** Albums and songs are fetched asynchronously from a custom REST API.
* **Core Music Player Functionality:** Seamless playback controls (play, pause, next, previous), seek bar, and volume adjustment.
* **Modern UI/UX:**
    * Responsive design adapting to desktop, tablet, and mobile viewports.
    * Ambient **Glassmorphism** aesthetic with subtle animations.
    * Interactive **cursor glow effect** enhancing the user experience.
* **Separated Deployment:** Frontend deployed on **Netlify**, backend API deployed on **Render**.

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite), JavaScript (ES6+), CSS3
* **Backend:** Node.js, Express.js
* **Database:** *MongoDB (Planned for V2.0)*
* **Deployment:**
    * Frontend: Netlify
    * Backend: Render
* **Version Control:** Git & GitHub

---

## 🏗️ Project Architecture

Tunesta utilizes a decoupled architecture:

1.  **React Frontend:** Served statically by Netlify. Responsible for UI rendering and user interactions. Makes API calls to the backend.
2.  **Express Backend API:** Hosted on Render. Serves album/song metadata via REST endpoints and provides static access to media files.

---

## 🔧 Getting Started Locally

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Chetanwadhwa03/Tunesta--Your-own-Music-Player-.git](https://github.com/Chetanwadhwa03/Tunesta--Your-own-Music-Player-.git)
    cd Tunesta--Your-own-Music-Player-
    ```

2.  **Setup & Run Backend:**
    ```bash
    cd Backend
    npm install
    node server.js
    # (API will run on http://localhost:3000)
    ```

3.  **Setup & Run Frontend (in a new terminal):**
    ```bash
    cd "Tunesta- Your own Music player!(React)"
    npm install
    npm run dev
    # (Frontend will run on http://localhost:5173 by default)
    ```

---

## 🔮 Future Plans (V2.0)

* **MongoDB Integration:** Replace hardcoded JSON data with a persistent MongoDB database.
* **YouTube Integration:** Implement a unique feature allowing users to add songs by pasting YouTube links.
* **User Authentication:** Add user accounts for personalized libraries.

---
