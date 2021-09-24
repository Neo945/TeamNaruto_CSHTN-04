import React, { useState, useEffect } from "react";
import Register from "./components/Chatbot/register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Products from "./components/Products/Products";
import { commerce } from "./components/lib/commerce";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import Login from "./components/Chatbot/login";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState();
  const [error, setError] = useState();
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleUpdateCart = async (productId, quantity) => {
    const res = await commerce.cart.update(productId, { quantity });
    setCart(res.cart);
  };

  const handleRemoveCart = async (productId) => {
    const res = await commerce.cart.remove(productId);
    setCart(res.cart);
  };
  const handleEmptyCart = async () => {
    const res = await commerce.cart.empty();
    setCart(res.cart);
  };
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setError(error.data.error.message);
    }
  };
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  React.useEffect(() => {
    if (user === null) {
      fetch("http://localhost:5000/api/user/get", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
          } else {
            localStorage.setItem("user", null);
            setUser(null);
          }
        });
    }
  }, []);
  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/chatbot">
          {user ? (
            <Products
              user={user}
              products={products}
              handleAddToCart={handleAddToCart}
              handleEmptyCart={handleEmptyCart}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/">
          {user ? (
            <Products
              user={user}
              products={products}
              handleAddToCart={handleAddToCart}
              handleEmptyCart={handleEmptyCart}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route exact path="/cart">
          {user ? (
            <Cart
              cart={cart}
              handleUpdateCart={handleUpdateCart}
              handleRemoveCart={handleRemoveCart}
              handleEmptyCart={handleEmptyCart}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/checkout">
          <Checkout
            cart={cart}
            order={order}
            handleCaptureCheckout={handleCaptureCheckout}
            error={error}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
