import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from './pages/auth';
import { useState } from 'react'
import './index.css'
import Navbar from "./components/navbar"; 
import CartPage from "./pages/cart";
import { Toaster } from 'react-hot-toast';

function App() {
  const [authType, setAuthType] = useState(null);

  const handleAuth = (type) => {
    setAuthType(type);
  };


  return (
    <div>
      <Router>
        <Navbar handleAuth={handleAuth}   setAuthType={setAuthType} />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home handleAuth={handleAuth} />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
      {authType && (
        <AuthPage
          type={authType}
          setAuthType={setAuthType}
        />
      )}
    </div>
  );
}

export default App;