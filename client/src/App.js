import React from "react";
import Chatbot from "./Chatbot/Chatbot";
import Login from "./Chatbot/login";
import Register from "./Chatbot/register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chatbot">
          <Chatbot />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
