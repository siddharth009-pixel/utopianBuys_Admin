import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../actions/auth.action";
import './style.css'


export default function Header() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch()
  const logout=()=>{
    dispatch(signOut())
  }

  function renderNonLoggedInLinks() {
    return (
      <Nav style={{marginLeft:'auto',marginRight:'40px',cursor:"pointer"}}>
        <li className="nav-item">
          <NavLink to="/signup" style={{color:"white",fontWeight:"bold"}} className="nav-link">
            Signup
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/signin" style={{color:"white",fontWeight:"bold"}} className="nav-link">
            Signin
          </NavLink>
        </li>
      </Nav>
    );
  };

  function renderLoggedInLinks(){
    return(
    <Nav style={{marginLeft:'auto',marginRight:'40px',cursor:"pointer"}}>
      <span className="nav-item" style={{color:"white",fontWeight:"bold"}} onClick={logout}>Signout</span>
    </Nav>
    )
  };

  return (
    <Container fluid style={{width:'100wh',padding:0,margin:0,marginRight:0}}>
    <Nav>
      <Container fluid style={{paddingLeft:0,paddingRight:0,marginRight:0}}>
        <Navbar className={"headerBg"} bg="light" expand="lg" style={{ zIndex: 2}}>
          <NavLink to="/" className="nav-link h4" style={{color:"white"}}>
            Admin Dashboard
          </NavLink>
          {/* <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

              {auth.authenticate
                ? renderLoggedInLinks()
                : renderNonLoggedInLinks()}
          
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Nav>
    </Container>
  );
}
