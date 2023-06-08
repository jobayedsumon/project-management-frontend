import React from "react";
import instance from "../helpers/fetchWrapper";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  return <div></div>;
};

export default Dashboard;
