# Best Cars Dealership

A Django-powered dealership discovery and customer-review project with a React sign-up interface and responsive HTML pages.

## Project structure

- `backend/` — Django project and authentication API.
- `users/` — registration, login, and logout endpoints.
- `server/frontend/` — Vite + React frontend.
- `server/frontend/src/components/Register/Register.jsx` — React sign-up form with Username, First Name, Last Name, Email, and Password fields.
- `server/frontend/static/About.html` — About Us page and leadership profile cards.
- `server/frontend/static/Contact.html` — Contact Us page and contact form.
- Root-level HTML/CSS/JavaScript files — original static frontend pages.

## Run the Django backend

From the repository root, activate your existing Python environment, install project dependencies if needed, and run:

```bash
cd backend
python manage.py migrate
python manage.py runserver 127.0.0.1:8003
```

The authentication API endpoints are:

- `POST /api/users/register/`
- `POST /api/users/login/`
- `POST /api/users/logout/`

## Run the React frontend

In a second terminal, from the repository root:

```bash
cd server/frontend
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`. The registration form uses `VITE_API_URL` when set, otherwise it calls `http://127.0.0.1:8003`.

To override the backend address, create a local `.env` file inside `server/frontend/` based on `.env.example`.

## Notes

- The registration API creates Django users. Do not commit real passwords, tokens, local databases, or secret credentials.
- Leadership names and `.example` email addresses on the About page are demonstration placeholders, not real company contacts.
- The Contact page prepares an email in the visitor's email application; it is not connected to a server-side contact-message endpoint.
- Run and test the backend and frontend locally before collecting screenshots or submitting evidence. Terminal outputs and screenshots should reflect actual test runs.
