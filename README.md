# Edgistify-assignment

## Introduction
This is an E-commerce website.This e-commerce platform is designed to provide users with a seamless shopping experience for a wide range of electronics and gadgets, including smartphones, laptops, smartwatches, and more.

## Project Type
Fullstack

## Deployed App
Frontend: https://edgistify-frontend-red.vercel.app/<br>
Backend: https://edgistify-backend-zn1f.onrender.com/

## Features
- User Authentication - Sign up and log in to access personalized features.
- Product Browsing & Details - Explore a wide range of gadgets with detailed product descriptions and pricing.
- Cart Management - Remove items from the cart if needed.
- Order Placement - Place orders seamlessly with a simple checkout process.
- Responsive Design - Optimized for all devices—desktop, tablet, and mobile.

## Installation & Getting started
### E-commerce repository
```bash
git clone https://github.com/KeertiPawar8/Edgistify-assignment.git
cd Edgistify-assignment
```
### Backend
```bash
cd backend
npm install
npm run server
```

### Frontend
```bash
cd frontend
yarn
yarn run dev
```

# Postman Collection
A Postman collection named Edgistify-Assignment.postman_collection.json is available in the codebase. This collection can be used to test the APIs.

Steps to Use:<br>
- Download the file from the codebase.
- Open the Postman application.
- Go to File > Import, then select the downloaded Edgistify-Assignment.postman_collection.json file.
- This will import the collection into Postman, allowing you to test all the APIs easily.

## API Endpoints
POST `https://edgistify-backend-zn1f.onrender.com/user/register` - Used to register a new user.<br>
POST `https://edgistify-backend-zn1f.onrender.com/user/login` - Used to login.<br>
POST `https://edgistify-backend-zn1f.onrender.com/product/addToCart` - Used to add products to the Cart.<br>
GET `https://edgistify-backend-zn1f.onrender.com/product/getCartProducts` - Used to fetch all Cart Products.<br>
PUT `https://edgistify-backend-zn1f.onrender.com/product/increase-quantity` - Used to increase product quantity in Cart.<br>
PUT `https://edgistify-backend-zn1f.onrender.com/product/decrease-quantity` - Used to decrease product quantity in Cart.<br>
DELETE `https://edgistify-backend-zn1f.onrender.com/product/removeFromCart` - Used to remove a product from Cart.<br>
POST `https://edgistify-backend-zn1f.onrender.com/product/place-order` -  Used to place order.<br>


## Technology Stack

- Node.js
- Express.js
- MongoDB
- React.js
- Vercel
- Render



