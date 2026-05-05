# Currency Calculator

A full-stack currency converter with an admin panel for managing exchange rates

## Tech Stack
- Backend: Node.js, Express, PostgreSQL, JWT
- Frontend: Vue 3 (Composition API), Vite, Bootstrap 5, Axios
- Database: PostgreSQL
- Deployment: Docker, Docker Compose, Nginx

## Features
- Currency conversion between 20 currencies (380 exchange rate pairs)
- Public access to currency calculator
- Admin login with JWT authentication
- Protected admin panel for managing exchange rates (CRUD operations)
- Token expiration handling

## Requirements
You need Docker Desktop to be installed (https://www.docker.com/products/docker-desktop/)

## How to run

1. Clone the repository:    

    `git clone https://github.com/gretadr/currency_calculator.git`

3. Navigate into the project folder:   
    
    `cd currency-calculator`

4. Run with Docker Compose:

    `docker-compose up --build`

5. When everything is up, open your browser at:
    http://localhost:8080

## Default Admin Credentials 

- Username: `admin`
- Password: `currency1`

## API endpoints

Public:

- `POST /api/auth/login`- Authenticate user
- `GET /api/currencies` - Get all exchange rates
- `GET /api/currencies/:id` - Get a specific rate
- `GET /api/convert?from=X&to=Y&amount=Z` - Convert currency

Protected (require JWT)

- `POST /api/currencies` - Create new rate
- `PATCH /api/currencies/:id` - Update rate
- `DELETE /api/currencies/:id` - Delete rate

## Stop Application

    Press `Ctrl+C`in the terminal