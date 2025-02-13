import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { FaShoppingCart } from 'react-icons/fa'// Import cart icon

const Navbar = ({ handleAuth, setAuthType }) => {

  const handleAuthWithToast = (type) => {
    const isAuthenticated = localStorage.getItem('authToken'); // Check if user is authenticated

    if (isAuthenticated) {
      if (type === 'login') {
        toast.success('You are already logged in');
      } else if (type === 'signup') {
        toast.success('You are already registered');
      }
    } else {
      handleAuth(type);
    }
  };

  const handelRedirectToCart = () => {
    const isAuthenticated = localStorage.getItem('authToken');
    if (!isAuthenticated) {
      toast.error("Please Sign Up first")
      setAuthType('signup')
    } else {
      window.location.href = "/cart";
    }
  };

  return (
    <nav className="bg-white shadow-md p-6 flex justify-between items-center sticky top-0 z-50">
      <a href='/' className="text-3xl font-extrabold text-indigo-600">E-Commerce</a>
      <div className="flex items-center">
        <button
          onClick={() => handleAuthWithToast("login")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg mr-3 transition-all"
        >
          Login
        </button>
        <button
          onClick={() => handleAuthWithToast("signup")}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg mr-3 transition-all"
        >
          Register
        </button>
        <button
          onClick={handelRedirectToCart}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-all flex items-center"
        >
          <FaShoppingCart className="h-5 w-5 mr-2" />
          View Cart
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  handleAuth: PropTypes.func.isRequired,
  setAuthType: PropTypes.func.isRequired, // Add this prop for redirecting to the cart
};

export default Navbar;