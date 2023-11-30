import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import Login from "./Login";
import ListsPage from "./ListPage";
import PrivateRoute from "./PrivateRoute";
import Tasks from "./Tasks";
import Welcome from "./Welcome";
import NotFoundPage from "./NotFoundPage";

function App() {

  return (
    <Router>
      <div>
        <NavBarWithLogout />
        <Routes>
          <Route path="/" element={<Welcome />}  />
          <Route path="/lists" element={<PrivateRoute> <ListsPage /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks/:listID" element={<PrivateRoute><Tasks /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

const NavBarWithLogout = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('userId');
      navigate('/');
    };
  
    return <NavBar onLogout={handleLogout} />;
  };

export default App;


