import  { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from "../components/productCard";
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

const HomePage = ({handleAuth , isAuthenticated}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}product/getProducts`);
        console.log(response);
        setProducts(response.data);
        isAuthenticated(true)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.log("yes")
      handleAuth("signup")
    } else {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}product/addToCart`,
          { productID: product.productID},
          {
            headers: {
              Authorization:token,
            },
          }
        );
        toast.success(response.data.message)
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to add to cart. Please try again.");
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-24 px-6">
        <h2 className="text-5xl font-extrabold mb-4">Discover the Best Products</h2>
        <p className="text-xl max-w-2xl mx-auto">Shop from a wide range of categories with unbeatable prices and premium quality.</p>
      </header>

      <section className="p-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </section>

      <footer className="bg-gray-900 text-white text-center py-6 mt-12">
        <p className="text-lg">&copy; 2025 E-Commerce. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleAuth:PropTypes.func.isRequired
};

export default HomePage;