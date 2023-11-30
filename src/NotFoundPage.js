import React from "react";

const NotFoundPage = () => {
  return (
    <div className="container justify-content-center">
      <div className="row">
        <div className="col-12 text-center">
          <h1>404</h1>
          <h4>Sorry Page Not Found</h4>
          <img
            src="/404 Cat.png"
            alt="404 Error Sad Cat"
            style={{ width: "400px", height: "400px" }}
            className="ml-4"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
