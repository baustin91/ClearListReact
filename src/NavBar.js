import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';


const NavBar = ({ onLogout }) => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="#home">ClearList</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" className='px-4'>Home</Nav.Link>
          <Nav.Link href="/lists" className='px-4'>Lists</Nav.Link>
          <Nav.Link href="/login" className='px-4'>Login</Nav.Link>
          <button className='btn btn-warning px-4' onClick={onLogout}>Logout</button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
