import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Verify from "./pages/verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

function App() {
  const [showLogin, setShowLogin] = useState(false); // Updated casing here

  return (
    <>
      {/* Render LoginPopup conditionally */}
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} /> {/* Consistent casing here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />

        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
