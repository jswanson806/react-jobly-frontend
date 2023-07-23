import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'reactstrap';
import AppContext from "./helpers/AppContext.js";
import './styles/NavBar.css';

/**
 * NavBar Component
 *
 * Renders the navigation bar with links to different pages based on the user's login status.
 * Requires the `AppContext` to be provided by a parent component.
 */


const NavBar = () => {
    const {logOut} = useContext(AppContext);
    const {user} = useContext(AppContext);
    const {token} = useContext(AppContext);

    // token is set to "" by default and when logOut() is called
    const loggedIn = token !== "" ? true : false

    return(
        <Navbar expand="md" className="navbar" data-testid="Navbar">
            <NavLink exact to="/" className="navbar-brand" data-testid="brand-link">
              Jobly
            </NavLink>

            <Nav className="navbar-nav">
              <NavItem>
                <NavLink to="/companies" className="nav-link" data-testid="companies-link">
                  Companies
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/jobs" className="nav-link" data-testid="jobs-link">
                  Jobs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile" className="nav-link" data-testid="profile-link">
                  Profile
                </NavLink>
              </NavItem>
              {/* conditionally render following based on logged in status of user */}
              {loggedIn && (
                <NavItem>
                  <button onClick={() => logOut()} className="nav-link-button" data-testid="logout-button">
                    Logout {`${user.username}`}
                  </button>
                </NavItem>
              )}
              {loggedIn === false && (
                <NavItem>
                  <NavLink to="/signup" className="nav-link" data-testid="signup-link">
                    Signup
                  </NavLink>
                </NavItem>
              )}
              {loggedIn === false && (
                <NavItem>
                  <NavLink to="/login" className="nav-link" data-testid="login-link">
                    Login
                  </NavLink>
                </NavItem>
              )}
            </Nav>
        </Navbar>

    );
};

export default NavBar;