import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 text-center px-3">
      <div className="card p-5">
        <h1 className="display-1">404</h1>
        <h3 className="nf-title">Page Not Found</h3>
        <p className="nf-text mb-4">
          The page you’re looking for doesn’t exist !
        </p>
        <Link to="/" className="btn custom-btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
