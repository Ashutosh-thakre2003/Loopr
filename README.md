# Loopr

# 📘 Project README: Full-Stack Financial Dashboard

## 🔧 Setup Instructions

### Prerequisites:

* Node.js >= 18.x
* MongoDB Atlas account
* Git & GitHub
* Render.com account (for backend deployment)
* Vercel.com account (for frontend deployment)

---

## 📁 Folder Structure

```
loopr/
├── backend/         # Node.js + Express + MongoDB
├── frontend/        # Vite + React + MUI
```

---

### 🔌 1. Clone the Repository

```bash
git clone https://github.com/yourusername/loopr-backend.git
cd loopr/backend
```

### 🛠️ 2. Backend Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```env
MONGO_URI=your_mongo_atlas_uri
JWT_SECRET=your_super_secret
PORT=5000
```

3. Seed the database (optional):

```bash
npx ts-node ./scripts/seedTransactions.ts
```

4. Run the backend:

```bash
npx ts-node-dev src/index.ts
```

It will be running on: `http://localhost:5000`

---

### 🌐 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

It will be available at: `http://localhost:5173`

---

## 🚀 Deployment

### Backend:

* Push to GitHub
* Deploy on [Render](https://render.com)
* Set `MONGO_URI`, `JWT_SECRET`, and `PORT` in Render Environment

### Frontend:

* Push to GitHub
* Deploy on [Vercel](https://vercel.com)
* Set `VITE_API_URL=https://your-backend.onrender.com/api`

---

## ✅ Usage Examples

### 🧑 User Authentication

* `POST /api/auth/register` - Register user
* `POST /api/auth/login` - Get JWT token

### 💳 Transactions

* `GET /api/transactions` - Authenticated user transaction list
* Filterable via client (date, name, min/max amount)

### 📤 Export

* Transactions can be filtered and exported as CSV

### 📊 Analytics

* Real-time chart from MongoDB
* Monthly aggregation by income/expense

### 💼 Wallet

* Total balance, last 5 transactions

---
....................................................................................................................
# 📘 API Documentation

Base URL (local): `http://localhost:5000/api`

### 📌 Auth Routes

#### `POST /auth/register`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response:** `201 Created`

```json
{ "message": "User registered" }
```

---

#### `POST /auth/login`

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

---

### 📌 Transactions

#### `GET /transactions`

**Headers:**

```http
Authorization: Bearer <JWT_TOKEN>
```

**Response:**

```json
[
  {
    "_id": "...",
    "name": "Invoice",
    "amount": 2500,
    "date": "2024-01-15T00:00:00Z",
    "type": "income",
    "category": "Revenue",
    "status": "Paid"
  },
  ...
]
```

---
.............................................................................................................................
# 📄 CSV Export Format

When user clicks `Export CSV`, file includes:

### ✅ Header row:

```
Name,Date,Amount,Status
```

### ✅ Example rows:

```
Invoice,2024-01-15,2500,Paid
Subscription,2024-02-01,1200,Pending
```

> ✅ Optional columns: `type`, `category`, `userId` — via column config UI

---

## 📚 Additional Notes

* All API calls require `JWT` token after login
* Responsive UI built with Material-UI (MUI)
* Protected routes using React Router + localStorage token
* All user data is stored and filtered by their specific `userId`

---

Let me know if you’d like Swagger/OpenAPI version of this documentation.
