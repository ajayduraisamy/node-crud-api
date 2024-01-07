# 🚀 Node CRUD API

A simple and professional Node.js + Express backend API for practicing full CRUD operations using MongoDB and Mongoose.

This project demonstrates:
- RESTful API design
- MVC folder structure
- MongoDB + Mongoose schema modeling
- Environment-based configuration
- Clean README & endpoint documentation

---

## 📦 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- nodemon

---

## ▶️ Run Locally

### Install dependencies
```bash
npm install
npm run dev

---


---
## Filter by status##
```bash
curl -X GET "http://localhost:5000/api/tasks?status=completed"
```

#### Filter by due date
```bash
curl -X GET "http://localhost:5000/api/tasks?dueDate=2023-01-01"
```

#### Filter by status and due date
```bash
curl -X GET "http://localhost:5000/api/tasks?status=completed&dueDate=2023-01-01"
```

---

### 📝 Create a Task

```bash