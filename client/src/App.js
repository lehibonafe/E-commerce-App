import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import LoginForm from "./components/LoginForm";
import Logout from "./pages/Logout";
import ProductView from "./pages/ProductView";
import Home from "./pages/Home";
import PageNotFound from "./components/PageNotFound";

import { UserProvider } from "./UserContext";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState({
    id: null,
    firstName: null,
    lastName: null,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((products) => {
        console.log(products);
        setProducts(products);
      });
  }, []);

  const unsetUser = () => {
    localStorage.clear();
  };

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result && typeof data.result.id !== undefined) {
          setUser({
            id: data.result.id,
            firstName: data.result.firstName,
            lastName: data.result.lastName,
          });
          // Removed console.log(user) here
        } else {
          setUser({
            id: null,
            firstName: null,
            lastName: null,
          });
        }
      });
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser, products, setProducts }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductView />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
