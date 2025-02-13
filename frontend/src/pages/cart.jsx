import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found. Redirecting to login.');
        window.location.href = "/auth";
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}product/getCartProducts`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCart(response?.data.cartData);
          console.log("response.data", response.data.cartData);
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    fetchCartProducts();
  }, []);

  const handleIncrement = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found. Redirecting to login.');
      window.location.href = "/auth";
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}product/increase-quantity`,
        { productID: id },
        {
          headers: {
            Authorization:token,
          },
        }
      );
      console.log("response",response)

      if (response.status === 200) {
        setCart(cart.map((item) => item.productID === id ? { ...item, quantity: item.quantity + 1 } : item));
        toast.success('Quantity increased successfully!');
      }
    } catch (error) {
      console.error('Error increasing quantity:', error);
      toast.error('Failed to increase quantity. Please try again.');
    }
  };

  const handleDecrement = async (id) => {
    const item = cart.find((item) => item.productID === id);
  
    if (item.quantity <= 1) {
      toast.error("Quantity can't be less than 1");
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found. Redirecting to login.');
      window.location.href = "/auth";
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}product/decrease-quantity`,
        { productID: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        setCart(cart.map((item) => item.productID === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
        toast.success('Quantity decreased successfully!');
      }
    } catch (error) {
      console.error('Error decreasing quantity:', error);
      toast.error('Failed to decrease quantity. Please try again.');
    }
  };

 const handleRemove = async (id) => {
  console.log("di",id)
  const token = localStorage.getItem('authToken');
  console.log("di",token)

  if (!token) {
    console.error('No authentication token found. Redirecting to login.');
    window.location.href = "/auth";
    return;
  }

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}product/removeFromCart`,
       { productID: id },
        {
          headers: {
            Authorization: token,
          },
        }
    );
    console.log("res",response)

    if (response.status === 200) {
      setCart(cart.filter((item) => item.productID !== id));
      toast.success('Product removed successfully!');
    }
  } catch (error) {
    console.error('Error removing product:', error);
    toast.error('Failed to remove product. Please try again.');
  }
};


  const calculateTotal = () => {
    return cart?.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmitOrder = async () => {
    if (!formData.name || !formData.email || !formData.address || !formData.phone) {
      toast.error('Please fill all fields');
      return;
    }
  
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('No authentication token found. Redirecting to login.');
      window.location.href = "/auth";
      return;
    }
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}product/place-order`,
        {
          shippingAddress: formData.address,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
  
      if (response.status === 201) {
        toast.success('Order placed successfully!');
        setIsModalOpen(false);
        setTimeout(()=>{
          window.location.href="/"
        },3000)
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        {cart?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
                {cart?.map((item) => (
                  <div key={item?.productID} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <img src={item?.image} alt={item?.name} className="w-24 h-24 object-cover rounded-lg" />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-500 mt-1">${item?.price.toFixed(2)}</p>
                        </div>
                        <button onClick={() => handleRemove(item?.productID)} className="text-gray-400 hover:text-gray-500">
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center gap-4">
                        <div className="flex items-center bg-gray-50 rounded-lg">
                          <button onClick={() => handleDecrement(item?.productID)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg">
                            −
                          </button>
                          <span className="w-12 text-center">{item?.quantity}</span>
                          <button onClick={() => handleIncrement(item?.productID)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg">
                            +
                          </button>
                        </div>
                        <div className="text-lg font-medium text-gray-900">
                          ${(item?.price * item?.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg h-fit p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium">${(calculateTotal() * 0.1).toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ${(calculateTotal() * 1.1).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(true)}  className="w-full mt-6 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
       {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border rounded mb-3" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border rounded mb-3" />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="w-full p-3 border rounded mb-3" />
            <textarea name="address" placeholder="Shipping Address" value={formData.address} onChange={handleInputChange} className="w-full p-3 border rounded mb-3"></textarea>
            <div className="flex justify-between mt-4">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              <button onClick={handleSubmitOrder} className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Place Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;