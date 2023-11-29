import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
import Login from "./Login";
import ListsPage from "./ListPage";
import PrivateRoute from "./PrivateRoute";
import Tasks from "./Tasks";

function App() {

  return (
    <Router>
      <div>
        <NavBarWithLogout />
        <Routes>
          <Route path="/"  />
          <Route path="/lists" element={<PrivateRoute> <ListsPage /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks/:listID" element={<Tasks />} />
        </Routes>
      </div>
    </Router>
  );
}

const NavBarWithLogout = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem('userId');
      navigate('/login');
    };
  
    return <NavBar onLogout={handleLogout} />;
  };

export default App;


