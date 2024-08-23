import React from "react";
import "./index.css";
import { Link } from "react-router-dom";

function PageError() {
  return (
    <div className="contenedorNotFound">
      <h1 className="contenedorNotFound__title">404</h1>
      <h2 className="contenedorNotFound__content">Page not found!</h2>

      <Link className="contenedorNotFound__back" to="/">
        {/* <img src="../../src/assets/arrow.svg" alt="back" /> */}
        <div className="contenedorNotFound__back--icon">
          
        </div>
        Go to homepage
      </Link>
    </div>
  );
}

export default PageError;
