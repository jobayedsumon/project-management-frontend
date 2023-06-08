import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-100 sidebar">
      <ul className="h-100 bg-dark text-white">
        <li className="test-white">
          <Link className="text-white" to="/">
            <i className="fas fa-home mx-3"></i>
            Dashboard
          </Link>
        </li>
        <li className="test-white">
          <Link className="text-white" to="/developers">
            <i className="fas fa-user-tie mx-3"></i>
            Developers
          </Link>
        </li>
        <li className="test-white">
          <Link className="text-white" to="/projects">
            <i className="fas fa-project-diagram mx-3"></i>
            Projects
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
