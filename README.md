# Skill Sharing and Learning Platform

A collaborative web application for sharing knowledge, learning new skills, and tracking user progress. Users can log in using Google, share educational posts, update their learning progress, and interact with other learners.

---

## 🚀 Features

- 🔐 **Google Authentication** (OAuth 2.0)
- 📝 **User Post Sharing**
- 📊 **Progress Tracking**
- 💬 **Interactive UI with MUI**
- ✅ **Forms and Validation with Formik + Yup**
- 🔒 **JWT-based Authentication**
- 🌐 **RESTful API using Spring Boot**
- 📚 **Skill Sharing and Learning Feed**

---

## 🛠️ Tech Stack

### Frontend:
- **React**
- **Material UI (MUI)**
- **Formik** (with Yup for validation)
- **Axios**
- **Google OAuth**
- **React Router DOM**

### Backend:
- **Spring Boot**
- **JWT Token Authentication**
- **Spring Security**
- **MySQL / PostgreSQL (or other supported DBs)**
- **Spring Data JPA**
- **CORS Configuration for API**

---

## 🔐 Authentication

- Google Sign-In using OAuth 2.0
- JWT Tokens are issued upon login and validated for protected routes
- Role-based access control (if needed for future scalability)

---


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
https://github.com/Randil01/skill-sharing-learning.git
cd skill-sharing-platform
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 3. Backend Setup

```bash
cd backend
create application.propertie file in resourcse/application.properties
./mvnw spring-boot:run
```

Ensure your database (e.g., MySQL) is running and credentials are correctly set in `application.properties`.

---

## 🔄 API Endpoints (Examples)

| Endpoint               | Method | Description               |
|------------------------|--------|---------------------------|
| `/auth/google`         | POST   | Login with Google         |
| `/api/posts`           | GET    | Fetch all shared posts    |
| `/api/posts`           | POST   | Create a new post         |
| `/api/progress`        | POST   | Update user progress      |
| `/api/user/profile`    | GET    | Get logged-in user data   |

---

## ✅ Future Improvements

- 💬 Commenting system for posts
- 🔔 Notification system
- 🧑‍🤝‍🧑 User following and collaboration features
- 📈 Analytics dashboard for learning metrics

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Authors

- Thenula Randila(thenularandila2002@gmial.com)
- Duvini Dulwanaya(duvinidulwanya@gmail.com)
- Vishwa Udantha(vishwaudantha@gmail.com)
- Rusith Supulsara(rusithsupulsara@gmail.com)


---
