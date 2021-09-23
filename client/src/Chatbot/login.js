import React from "react";
import { Redirect } from "react-router-dom";

export default (props) => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [redirect, setRedirect] = React.useState(false);
  return (
    <>
      {redirect && <Redirect to="/chatbot" />}
      <div className="login">
        <div className="login__container">
          <div className="login__container--title">
            <h1>Welcome to Chatbot</h1>
            <h2>Please login to continue</h2>
          </div>
          <div className="login__container--form">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (form.email && form.password) {
                  fetch("http://localhost:5000/api/user/login", {
                    method: "POST",
                    credentials: "include",
                    mode: "cors",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                      setRedirect(true);
                    });
                }
              }}
            >
              <div className="login__container--form--input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                />
              </div>
              <div className="login__container--form--input">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={form.password}
                  onChange={(event) =>
                    setForm({ ...form, password: event.target.value })
                  }
                />
              </div>
              <div className="login__container--form--input">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
