import React from "react";

export default (props) => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  return (
    <div className="register">
      <h1>Register</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetch("/api/user/register", {
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
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={form.name}
            onChange={(event) => {
              setForm({ ...form, name: event.target.value });
            }}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="username"
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
  );
};
