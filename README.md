# Food Delivery App

A **MERN stack** based Food Delivery App that offers users a platform to browse, select, and order food items. The app includes authentication and authorization, a cart for adding/removing items, real-time stock updates, and an order history feature. The project is built with **Vite** for the frontend, ensuring fast development and a responsive user interface.


## Features Breakdown

1. **User Authentication**: Users can register and log in securely using JWT tokens.
2. **Cart Page**: 
   - Users can add or remove items from their cart.
   - Real-time data updates the stock quantity as users modify their cart.
3. **Checkout Process**: A smooth flow to finalize the order with order summary and payment.
4. **Order History**: Users can view their past orders in the order history section.
5. **Category Filter**: Food items are separated into categories like Veg, Non-Veg, etc., making it easy for users to browse based on their preferences.
6. **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.


## Technologies Used

### Backend:
- **Node.js** with **Express.js** for the server
- **MongoDB** for the database
- **JWT** (JSON Web Token) for authentication and authorization
- **Mongoose** for MongoDB object modeling

### Frontend:
- **React.js** for building the user interface
- **Vite** for fast development and build
- **TailwindCSS/Material-UI** for styling

## Installation and Running the Project

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (running locally or through a service like MongoDB Atlas)
- **Git** (for cloning the repository)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/jaswant04/foodDelivery.git
   cd foodDelivery
2. Navigate to the backend folder and install the dependencies:

   ```bash
   cd server
   npm install
3. Set up the environment variables. Create a `.env` file in the `backend` directory and add the following:

   ```bash
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   PORT=3000
4. Start the backend server:

   ```bash
   npm start
The backend server will start on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend folder and install dependencies:

   ```bash
   cd ../client
   npm install
2. Set up environment variables for the frontend. Create a `.env` file in the `client` directory and add:

   ```bash
   VITE_API_URL= "http://localhost:3000/api"
3. Start the frontend server using Vite:

   ```bash
   npm run dev
The frontend server will start on `http://localhost:5173/`.

## Folder Structure

```plaintext
food-delivery-app/
├── server/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   └── main.jsx
└── README.md

