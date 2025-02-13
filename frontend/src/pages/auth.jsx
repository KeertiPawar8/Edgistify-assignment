import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthPage = ({ type, setAuthType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = type === 'signup'
      ? `${import.meta.env.VITE_API_URL}user/register`
      : `${import.meta.env.VITE_API_URL}user/login`;

    const data = type === 'signup'
      ? { fullName, email, password }
      : { email, password };

    try {
      const response = await axios.post(url, data);
       if(!response?.data?.hasError){
         toast.success(response?.data.message);
        }else{
         toast.error(response?.data.message);
         return
       }

      if (type === 'login') {
        // Store the token in local storage
        localStorage.setItem('authToken', response.data.token);
        setAuthType(null);
      }
      if(type==='signup'){
        setAuthType('login')
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <button onClick={() => setAuthType(null)} className="absolute top-3 right-3 text-gray-500">&times;</button>
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          {type === "login" ? "Login to Your Account" : "Create an Account"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {type === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-all">
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          {type === "login" ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setAuthType(type === "login" ? "signup" : "login")} className="text-indigo-500 font-semibold">
             {type === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

AuthPage.propTypes = {
  type: PropTypes.oneOf(['login', 'signup']).isRequired,
  setAuthType: PropTypes.func.isRequired,
};

export default AuthPage;