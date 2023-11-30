import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/getUserID/${username}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("User ID:", data.userID);
        localStorage.setItem("userId", data.userID);
        navigate("/lists");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <Form onSubmit={handleSubmit} className="col-sm-6 mt-2 px-1">
          <h2>Log In</h2>
          <Form.Group>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="success" type="submit" className="mt-2 w-100">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
