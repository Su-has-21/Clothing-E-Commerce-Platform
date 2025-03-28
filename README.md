# Clothing-E-commerce Application

This is a full-stack ecommerce application built with a React frontend and a Node.js/Express backend. It includes features for user authentication, product management, shopping cart, order processing, and more.

## Features

- User authentication (login, registration)
- Admin dashboard for managing products and orders
- Shopping cart and checkout functionality
- Product search and reviews
- Integration with PayPal for payments
- MongoDB as the database

## Technologies Used

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Other**: PayPal SDK, Cloudinary, JWT, Multer

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Ecommerce
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following variables:
   ```
   MONGODB_URI=<your-mongodb-uri>
   PORT=5000
   ```

4. Start the development servers:
   - Backend:
     ```bash
     cd backend
     npm run dev
     ```
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```

5. Access the application at `http://localhost:5173`.

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Admin
- `GET /api/admin/products` - Fetch all products
- `POST /api/admin/products` - Add a new product
- `GET /api/admin/orders` - Fetch all orders

### Shop
- `GET /api/shop/products` - Fetch products
- `POST /api/shop/cart` - Add to cart
- `GET /api/shop/cart` - View cart
- `POST /api/shop/address` - Add shipping address
- `POST /api/shop/order` - Place an order
- `GET /api/shop/search` - Search products
- `POST /api/shop/review` - Add a product review

### Common
- `GET /api/common/feature` - Fetch common features

## Frontend Routes

### Public Routes
- `/auth/login` - Login page
- `/auth/register` - Registration page

### Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/orders` - Manage orders

### Shop Routes
- `/shop/home` - Shop homepage
- `/shop/listing` - Product listing
- `/shop/checkout` - Checkout page
- `/shop/account` - User account
- `/shop/paypal-return` - PayPal return page
- `/shop/payment-success` - Payment success page
- `/shop/search` - Search products

### Other
- `/unauth-page` - Unauthorized access page
- `*` - 404 Not Found

