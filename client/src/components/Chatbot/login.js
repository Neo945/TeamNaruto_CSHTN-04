import React from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export default (props) => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  return (
    <>
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
                if (isEmail(form.email) && isStrongPassword(form.password)) {
                  console.log(form);
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
                      .then((res) => {
                        if (res.status === 201) {
                          window.location.href = "/";
                        }
                        return res.json();
                      })
                      .then((data) => {
                        console.log(data);
                        localStorage.setItem("user", JSON.stringify(data.user));
                      });
                  }
                } else {
                  console.log("Please fill all the fields");
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
