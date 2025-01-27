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
# Clone the repository
git clone https://github.com/yourusername/debt-management-app.git

# Navigate to the project folder
cd debt-management-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── context/             # React context providers
├── assets/              # Static files
├── hooks/               # Custom React hooks
├── services/            # API services
└── utils/               # Helper functions
```

## 🚀 Usage
1. Register/Login to your account
2. Create or join a group
3. Add expenses and members
4. Track balances and settle debts

## 🔗 API Documentation

### Authentication
- `POST /api/auth/login`
- `POST /api/auth/register`

### Transactions
- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/:id`

### Members
- `GET /api/members`
- `POST /api/members`
- `DELETE /api/members/:id`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request
