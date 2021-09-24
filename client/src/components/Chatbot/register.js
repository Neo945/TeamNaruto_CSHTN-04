import React from "react";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";

export default (props) => {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  return (
    <>
      <div className="register">
        <h1>Register</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (form.password === form.password_confirmation) {
              if (isEmail(form.email) && isStrongPassword(form.password)) {
                fetch("http://localhost:5000/api/user/register", {
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
                      window.location.href = "/login";
                    }
                    res.json();
                  })
                  .then((data) => {
                    console.log(data);
                  });
              } else {
                alert("Not a valid email or strong password");
              }
            } else {
              alert("password not match");
            }
          }}
        >
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={(event) => {
                setForm({ ...form, username: event.target.value });
              }}
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => {
                setForm({ ...form, email: event.target.value });
              }}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={(event) => {
                setForm({ ...form, password: event.target.value });
              }}
            />
          </label>
          <br />
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={form.password_confirmation}
              onChange={(event) => {
                setForm({ ...form, password_confirmation: event.target.value });
              }}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};
