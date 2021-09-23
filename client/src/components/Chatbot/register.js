import React from "react";
import { Redirect } from "react-router-dom";

export default (props) => {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [redirect, setRedirect] = React.useState(false);
  return (
    <>
      {redirect && <Redirect to="/chatbot" />}
      <div className="register">
        <h1>Register</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            fetch("http://localhost:5000/api/user/register", {
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