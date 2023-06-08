import React from "react";
import Sidebar from "./Sidebar";

const Outlet = ({ children }) => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-md-2 px-0">
          <Sidebar />
        </div>
        <div className="col-md-10">{children}</div>
      </div>
    </div>
  );
};

export default Outlet;
