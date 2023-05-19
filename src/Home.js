import React, { useContext } from "react";
import './Home.css';
import { UserContext } from "./helpers/UserContext.js";

/**
 * Home Component
 *
 * Renders the homepage content with a welcome message based on the user's login status.
 * Requires the `UserContext` to be provided by a parent component.
 */


const Home = () => {
    const {user} = useContext(UserContext);

    return(
        <div className="Home-content" data-testid="Home-content">
            <h1 className="Home-title">Jobly</h1>
            <p className="Home-text">All the jobs in one, convenient place.</p>
            {user.username !== undefined 
            ? 
            <h2 className="Home-greeting" data-testid="Home-greeting-message">Welcome Back, {`${user.username}`}!</h2>
            :
            <h2 className="Home-greeting" data-testid="Home-login-message">Hello, please register or login to browse!</h2>
            }
        </div>
    );
};

export default Home;