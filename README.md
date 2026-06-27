# 💱 Currency Calculator

A full-stack currency converter with a secured admin panel for managing exchange rates. Built with Vue 3, Node.js, and PostgreSQL.

## 🌐 Live Demo

👉 **[Try the App](https://your-vercel-url.vercel.app)** 👈

**Demo Admin Login:**
- Username: `admin`
- Password: `currency1`

## 📸 Screenshots

![Calculator](./screenshots/calculator.png)
![Admin Panel](./screenshots/admin.png)

## ✨ Features

- 🔄 Convert between 20 currencies (380 exchange rate pairs)
- 🔍 Searchable currency dropdowns
- 🔁 One-click currency swap
- 🔐 JWT-based admin authentication
- ⚙️ Protected admin panel with full CRUD operations
- 🔄 Automatic reverse pair updates
- ⏱️ Token expiration with auto-logout
- 🐳 Dockerized for easy local development

## 🛠️ Tech Stack

**Frontend:** Vue 3 (Composition API), Vue Router, Vite, Bootstrap 5, Axios  
**Backend:** Node.js, Express, JWT, Bcrypt  
**Database:** PostgreSQL  
**DevOps:** Docker, Docker Compose  
**Deployment:** Vercel (Frontend), Render (Backend), Supabase (Database)

## 🚀 Local Setup

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Steps

```bash
# Clone the repository
git clone https://github.com/gretadr/currency_calculator.git
cd currency_calculator

# Run with Docker Compose
docker-compose up --build
```

Open your browser at `http://localhost:8080`

## 🔌 API Endpoints

### Public
- `POST /api/auth/login` — Authenticate user
- `GET /api/currencies` — Get all exchange rates
- `GET /api/currencies/:id` — Get a specific rate
- `GET /api/convert?from=X&to=Y&amount=Z` — Convert currency

### Protected (requires JWT)
- `POST /api/currencies` — Create a new rate
- `PATCH /api/currencies/:id` — Update a rate
- `DELETE /api/currencies/:id` — Delete a rate

## 👩‍💻 Author

**Greta Dragoti**  
[GitHub](https://github.com/gretadr) · [LinkedIn](your-linkedin-url)

---

⭐ If you find this project useful, please give it a star!
