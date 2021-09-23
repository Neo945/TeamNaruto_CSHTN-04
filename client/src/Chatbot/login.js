import React from "react";

export default (props) => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  return (
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
              fetch("/api/user/login", {
                method: "POST",
                credentials: "include",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
              });
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
  );
};
