# 💰 Debt Management App

A modern web application for managing shared expenses and debts among groups.

## ✨ Features

- User authentication and authorization
- Group expense tracking
- Debt calculation and settlement suggestions
- Transaction history
- Member management
- Real-time balance updates

## 🛠 Tech Stack

- React 18
- Vite
- Material-UI
- Axios
- Day.js
- React Router

## 📦 Installation

```bash
# Clone repository 
git clone https://github.com/yourusername/debt-management-app.git

# Navigate to project folder
cd debt-management-app

# Install dependencies
npm install

# Start development server
npm run dev

📁 Project Structure
src/
├── components/          # Reusable components
├── context/            # React context providers
├── assets/            # Static files
├── hooks/             # Custom React hooks
├── services/          # API services
└── utils/             # Helper functions

🚀 Usage
Register/Login to your account
Create or join a group
Add expenses and members
Track balances and settle debts

🔗 API Documentation
Authentication
POST /api/auth/login
POST /api/auth/register
Transactions
GET /api/transactions
POST /api/transactions
PUT /api/transactions/:id
Members
GET /api/members
POST /api/members
DELETE /api/members/:id

🤝 Contributing
Fork the repository
Create your feature branch: git checkout -b feature/AmazingFeature
Commit changes: git commit -m 'Add AmazingFeature'
Push to branch: git push origin feature/AmazingFeature
Open a pull request
