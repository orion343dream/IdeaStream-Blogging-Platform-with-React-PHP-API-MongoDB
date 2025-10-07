
---<!-- Badges at the very top -->
![GitHub repo size](https://img.shields.io/github/repo-size/orion343dream/IdeaStream-Blogging-Platform-with-React-PHP-API-MongoDB?color=blue)
![GitHub stars](https://img.shields.io/github/stars/orion343dream/IdeaStream-Blogging-Platform-with-React-PHP-API-MongoDB?style=social)
![GitHub forks](https://img.shields.io/github/forks/orion343dream/IdeaStream-Blogging-Platform-with-React-PHP-API-MongoDB?style=social)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PHP](https://img.shields.io/badge/PHP-8.1-blue.svg?logo=php)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-5.0-green?logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-blue?logo=tailwindcss)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)
![JWT](https://img.shields.io/badge/JWT-Secure-red?logo=JSONWebTokens)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

# 📝 IdeaStream
*A modern blogging platform built with React (frontend), PHP REST API (backend), and MongoDB (database).*

---

## 📌 Overview
**IdeaStream** is a full-stack blogging platform where users can:  
- ✍️ Create, edit, and delete blog posts  
- 💬 Comment on posts and interact with others  
- 🔐 Authenticate with JWT-based login/register system  
- 🛡️ Role-based access (User/Admin)  
- 📂 Manage content with an Admin panel  

It’s built with a **decoupled architecture**:
- **Frontend** → React (dynamic, single-page application)  
- **Backend** → PHP REST API (authentication, CRUD, business logic)  
- **Database** → MongoDB (flexible NoSQL storage for posts, users, comments)  

---

## 🏗️ Architecture

![Architecture Diagram](https://user-images.githubusercontent.com/your-username/architecture-diagram.png)  
> Replace this link with the actual SVG/PNG exported from [Mermaid Live Editor](https://mermaid.live/).

---

## ✨ Features

### 🔑 Authentication & Authorization
- JWT-based login and registration  
- Role-based access (User/Admin)  

### 📰 Blogging System
- Create, edit, delete posts  
- Draft vs Approved posts (admin moderation)  
- Categories & tags support  

### 💬 Comments System
- Users can comment on posts  
- Admins can remove inappropriate comments  

### ⚙️ Admin Panel
- Approve/reject posts  
- Manage users and content  

### 🎨 Frontend Features
- React Router for navigation  
- Responsive design with Tailwind/Bootstrap  
- Protected routes for authenticated users  

---

## 📂 Project Structure

```text
IdeaStream/
│
├── backend/              # PHP REST API
│   ├── config/           # DB connection, JWT config
│   ├── routes/           # Auth, posts, comments endpoints
│   ├── controllers/      # Business logic
│   ├── vendor/           # Composer dependencies
│   └── index.php         # Entry point
│
├── frontend/             # React app
│   ├── src/
│   │   ├── components/   # Navbar, PostCard, CommentList, etc.
│   │   ├── pages/        # Home, Dashboard, PostPage, AdminPanel
│   │   ├── services/     # API calls with Axios
│   │   ├── context/      # Auth context
│   │   └── App.js
│   └── package.json
│
└── README.md


## ⚡ Tech Stack

- **Frontend**: React, React Router, Axios, TailwindCSS/Bootstrap  
- **Backend**: PHP 8+, Composer, Firebase JWT library, MongoDB PHP driver  
- **Database**: MongoDB (Atlas or local)  

---

## 🔧 Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/orion343dream/IdeaStream-Blogging-Platform-with-React-PHP-API-MongoDB.git
cd IdeaStream-Blogging-Platform-with-React-PHP-API-MongoDB
````

### 2️⃣ Backend Setup (PHP API)

```bash
cd backend
composer install
```

* Copy `.env.example` → `.env` and configure:

```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=storysphere
JWT_SECRET=your_secret_key
```

* Start PHP server:

```bash
php -S localhost:8000 -t backend
```

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

* React app will run at `http://localhost:3000`

### 4️⃣ Connect

Frontend will call backend APIs at `http://localhost:8000/api/...`.

---

## 🚀 Deployment

* **Frontend** → Deploy to Vercel/Netlify
* **Backend** → Deploy to Heroku/DigitalOcean/Linode
* **Database** → MongoDB Atlas (cloud-hosted MongoDB)

---

## 🧪 API Endpoints

### Authentication

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login & get JWT
* `GET /api/auth/me` → Get current user

### Posts

* `GET /api/posts` → Get all approved posts
* `POST /api/posts` → Create new post (auth required)
* `PUT /api/posts/:id` → Update post
* `DELETE /api/posts/:id` → Delete post
* `PATCH /api/posts/:id/approve` → Approve post (admin only)

### Comments

* `GET /api/posts/:id/comments` → List comments
* `POST /api/posts/:id/comments` → Add comment
* `DELETE /api/comments/:id` → Delete comment

---

## 👥 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature X"`
4. Push to branch: `git push origin feature-name`
5. Create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🌟 Acknowledgements

* [React](https://reactjs.org/)
* [PHP](https://www.php.net/)
* [MongoDB](https://www.mongodb.com/)
* [JWT Auth](https://github.com/firebase/php-jwt)

````
