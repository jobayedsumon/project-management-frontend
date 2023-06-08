import React from "react";
import { errorAlert } from "../helpers/alerts";
import instance from "../helpers/fetchWrapper";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (data.email && data.password) {
      instance
        .post("/auth/login", data)
        .then((res) => {
          if (res.status === 200) {
            dispatch(login(res.data));
          }
        })
        .catch((err) => {
          errorAlert(err.message);
        });
    } else {
      errorAlert("Please fill in all fields");
    }
  };

  return (
    <div className="container h-100 d-flex flex-column justify-content-center align-items-center">
      <h3 className="mb-4">Project Management</h3>
      <div className="card w-50">
        <div className="card-body">
          <h5 className="card-title mb-4">Login</h5>
          <form onSubmit={submitHandler}>
            <div className="form-group mb-4">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                name="email"
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                name="password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
