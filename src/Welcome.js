import React from "react";
import { Card, CardBody } from "react-bootstrap";

const Welcome = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8 col-12 mt-3">
          <Card>
            <CardBody className="text-center">
              <h1 className="text-light">ClearList</h1>
              <h6>(React)</h6>
              <br />
              <h5 className="text-light">Bradley Austin</h5>
              <h5 className="text-light">Grand Canyon University</h5>
              <h5 className="text-light">
                CST-391 - JavaScript Web Application Development
              </h5>
              <h5 className="text-light">Professor Dinish Gudibandi</h5>
              <h5 className="text-light">12/03/2023</h5>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
