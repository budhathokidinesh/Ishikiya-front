# Ishikiya Frontend 🚀

![License](https://img.shields.io/badge/License-PRIVATE-lightgrey) ![Node.js](https://img.shields.io/badge/Node-%3E%3D18.x-green) ![NPM Version](https://img.shields.io/badge/npm-9.5.1-blue)

## 🍣 Project Description

Ishikiya Frontend is a modern, fast, and scalable React-based web application designed for managing food orders, featuring robust admin order management, filters, PDF downloading, and seamless user experience. Built with Vite, React 19, Redux Toolkit, and TailwindCSS for styling and performance.

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Project Folder Structure](#-project-folder-structure)
- [Dependencies Explanation](#-dependencies-explanation)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

## ✨ Features

- Admin order management with real-time status updates
- Date and status filtering for orders
- PDF download of filtered orders
- Integration with Redux Toolkit for state management
- React-Router-Dom powered routing
- Comprehensive UI components using Radix UI and TailwindCSS
- OpenAI integration support (via openai package)
- Stripe payment integration
- Responsive and user-friendly interface

## 🛠️ Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js v18.x or higher installed
- npm v9.x or higher installed
- An OpenAI API key (for features requiring OpenAI integration)

## 🚀 Getting Started

Follow these steps to get a development environment running:

```bash
# Clone the repository
 git clone https://github.com/yourusername/ishikiya-front

# Install dependencies
 npm install

# Create and setup your .env file
 cp .env.example .env
# Then update .env with your config

# Start the development server
 npm run dev
```

Other useful commands from `package.json`:

- Build the project:

```bash
npm run build
```

- Preview production build:

```bash
npm run preview
```

- Lint source files:

```bash
npm run lint
```

## 🔑 Environment Variables

Create a `.env` file at the root of the project and add the following placeholders:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
OTHER_API_KEY=your_other_api_key_here
```

_Note:_ Do NOT commit real API keys to source control.

## 💻 Usage

### Example: AdminOrderPage Component

The AdminOrderPage component demonstrates:

- React hooks with local and redux state
- Fetching and filtering orders
- Changing order and payment statuses with dispatch
- Exporting order list as PDF

Simplified usage snippet:

```jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAdmin,
  changeOrderStatus,
} from "@/store/order/orderSlice";

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchAllOrdersAdmin());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(
      changeOrderStatus({ orderId, updateData: { orderStatus: newStatus } }),
    );
  };

  // Render filtered orders with controls (see full src/pages/OrderPage.jsx for details)
  return <div>...</div>;
};

export default AdminOrderPage;
```

## 📁 Project Folder Structure

```
ishikiya-front/
├── node_modules/           # Project dependencies
├── public/                 # Static public assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # React pages (e.g., OrderPage.jsx)
│   ├── store/              # Redux store slices
│   ├── App.jsx             # Main React app entry
│   └── main.jsx            # Application bootstrap
├── .env                    # Environment variables
├── package.json            # Project package config & scripts
├── vite.config.js          # Vite build config
└── README.md               # Project documentation
```

## 📦 Dependencies Explanation

- **React 19**: UI library for building UI components.
- **Redux Toolkit**: Simplifies Redux state management.
- **React Router DOM**: Handles routing in the SPA.
- **Radix UI**: Accessible UI primitives for React.
- **TailwindCSS & DaisyUI**: Utility-first CSS and component styles.
- **OpenAI**: Provides API to OpenAI services.
- **Stripe JS**: Stripe payment integration.
- **Axios**: Promise-based HTTP client.
- **date-fns**: Date utility library.
- Additional libs: react-icons, react-toastify, lodash, jspdf, html2canvas for rich UI and PDF generation.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a branch for your feature or bugfix (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push your branch (`git push origin feature/YourFeature`)
5. Open a Pull Request explaining your changes

Please adhere to coding standards and test your changes thoroughly.

## 📄 License

This project is private. Please refer to your organization's policies.

## 👤 Author

**Dinesh Budhathoki**

- GitHub: [https://github.com/dineshbudhathoki](https://github.com/dineshbudhathoki)
- LinkedIn: https://linkedin.com/in/dineshbudhathoki

---

Thank you for using Ishikiya Frontend! 🍣🍱✨
