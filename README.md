# Corporate Quiz

<div align="center">

A modern web application for managing companies, employees, and corporate quizzes.

Built with **React**, **TypeScript**, **Vite**, **Redux Toolkit**, and **Material UI**.

</div>

---

## 📖 Overview

Corporate Quiz is a web application that allows companies to create and manage quizzes for their employees. It provides role-based access, authentication, company management, employee invitations, and quiz participation in a modern and responsive interface.

The project follows a feature-oriented architecture to keep the codebase scalable and maintainable.

---

## ✨ Features

### Authentication

- JWT authentication
- Google OAuth support
- Protected routes
- Persistent login
- Token refresh mechanism

### Company Management

- Create companies
- Edit company information
- Company profile
- Member management

### User Management

- User profiles
- Company members
- Invitations
- Role-based permissions

### Quiz Management

- Create quizzes
- Edit quizzes
- Delete quizzes
- Pass quizzes
- Review results

### Additional Features

- Import/Export using Excel
- Localization (i18next)
- Responsive interface
- Form validation with React Hook Form + Zod
- Global notifications
- Persistent application state

---

## 🛠 Tech Stack

### Frontend

- React 19
- TypeScript
- Vite

### State Management

- Redux Toolkit
- Redux Persist

### Routing

- React Router

### UI

- Material UI (MUI)
- Emotion

### Forms

- React Hook Form
- Zod

### Networking

- Axios

### Localization

- i18next
- react-i18next

### Other

- XLSX
- JWT Decode

---

## 📂 Project Structure

```text
src/
├── api/                # API client and interceptors
├── assets/             # Images and icons
├── components/
│   ├── layouts/
│   └── ui/
├── features/
│   ├── auth/
│   ├── companies/
│   ├── invitations/
│   ├── notifications/
│   ├── quizzes/
│   └── users/
├── hooks/
├── locales/
├── pages/
├── store/
├── types/
└── utils/
```

The project uses a **feature-based architecture**, where each business domain is isolated into its own module.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/Elswortz/FE-corporate-quiz.git

cd FE-corporate-quiz

npm install
```

### Run development server

```bash
npm run dev
```

### Build production version

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

---

## 📜 Available Scripts

| Command | Description |
|----------|-------------|
| npm run dev | Start development server |
| npm run build | Build production version |
| npm run preview | Preview production build |
| npm run lint | Run ESLint |

---

## 🔐 Authentication

The application uses JWT-based authentication.

Authentication flow includes:

- Login
- Registration
- Google OAuth
- Access token storage
- Automatic token refresh
- Protected routes

---

## 👥 User Roles

The application supports role-based access.

Typical roles include:

- Owner
- Admin
- Member

Permissions are used throughout the application to control available actions.

---

## 🌍 Localization

Internationalization is implemented using **i18next**.

Translation resources are located inside:

```
src/locales/
```

---

## 📁 Import & Export

The project includes XLSX support for importing and exporting quiz-related data.

---

## 🐳 Docker

A Dockerfile is included, allowing the frontend to be containerized for deployment.

---

## 🏗 Architecture

The project follows modern frontend practices:

- Feature-first folder structure
- Reusable UI components
- Centralized Redux store
- API abstraction layer
- Custom hooks
- Strong typing with TypeScript
- Schema validation using Zod

---

## 📸 Screenshots

Screenshots can be added here.

| Login | Dashboard |
|-------|-----------|
| *(image)* | *(image)* |

| Companies | Quiz |
|-----------|------|
| *(image)* | *(image)* |

---

## 🔮 Future Improvements

- Dashboard analytics
- Advanced filtering
- Quiz statistics
- Email notifications
- Dark mode
- Unit & integration tests
- CI/CD pipeline

---

## 👨‍💻 Author

**Andrii Shkliar**

Frontend Developer

GitHub: https://github.com/Elswortz

---

## 📄 License

This project was created for educational and portfolio purposes.
