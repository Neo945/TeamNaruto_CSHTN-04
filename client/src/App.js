import React from "react";
import Chatbot from "./Chatbot/Chatbot";
import Login from "./Chatbot/login";
import Register from "./Chatbot/register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
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
          console.log(data);
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
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/chatbot">
          {user ? <Chatbot user={user} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          {user ? <Chatbot user={user} /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
