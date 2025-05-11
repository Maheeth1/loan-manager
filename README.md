# 🏦 Loan Manager App

A full-stack web application to manage loan applications with user, verifier, and admin dashboards. Built with **React**, **Node.js**, **Express**, and **SQLite**.

---

## 📋 Features

- 📥 **Loan Application Form** for users.
- ✅ **Verifier Dashboard** to review submitted applications.
- 📊 Clean and responsive UI from Figma design.
- 💾 Data stored in a local SQLite database.

---

## 🛠️ Tech Stack

**Frontend**  
- React (TypeScript)
- Axios  
- CSS (custom styling)

**Backend**  
- Node.js + Express  
- SQLite3  
- TypeScript  

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- Git

### Clone the Repository

```bash
git clone https://github.com/Maheeth1/loan-manager.git
cd loan-manager
📦 Backend Setup
bash
Copy
Edit
cd server
npm install
Start the server
bash
Copy
Edit
npx ts-node src/index.ts
Runs on http://localhost:4000
```
🌐 Frontend Setup
```bash
cd client
npm install
npm start
Runs on http://localhost:3000
```
📁 Project Structure
```bash
loan-manager/
├── client/            # React frontend
├── server/            # Node + Express backend
│   └── data/          # Contains `loans.db` SQLite database
```
User fills out the loan application form

Verifier dashboard lists submitted applications (status: pending by default)

Admin dashboard for analytics (if implemented)

🧪 API Endpoints
```
Method	Endpoint	Description
POST	/api/applicationRoutes/loans	Submit loan application
GET	/api/applicationRoutes/applications	Fetch all loan applications
```

📌 Status Field
There is no status column in the DB. Applications are shown with default status "Pending" in the dashboard.

🧑‍💻 Author
Made by Maheeth


---

Let me know if you'd like:
- A split version for separate `client/` and `server/` folders
- A `.gitignore`
- Deployment instructions (like Vercel + Render or Railway)

Would you like this in a downloadable `.md` file?
