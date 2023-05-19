import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "./helpers/AppContext.js";
import './LoginForm.css';

/**
 * LogInForm Component
 *
 * Renders a login form and handles user login functionality.
 *
 * State:
 * - formData: Tracks the state of the login form data.
 *
 * Hooks:
 * - useContext: Accesses the logIn function from the AppContext.
 *
 * Functions:
 * - handleChange: Updates the formData state as the user types in the input fields.
 * - handleSubmit: Submits the login form, calls the logIn function, resets form inputs, and redirects to the homepage.
 */


const LogInForm = () => {
    const {logIn} = useContext(AppContext);
    // initial value of formData
    const INITIAL_STATE = {
        username: "",
        password: ""
    }

    // ********************* State *********************

    const [formData, setFormData] = useState(INITIAL_STATE);

    const history = useHistory();

    // update the form data as the user types in the input
    const handleChange = (e) => {
        const { name, value } = e.target;
        // update formData state with input field name and value of input field
        setFormData(formData => ({
          ...formData,
          [name]: value,
        }));
      }

      // ********************* Functions *********************

    // submit the form data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // set the input as the value of 'name' in filters

        const user = {
            username: formData.username,
            password: formData.password
        }
        // call the async logIn function from 'App.js'
        await logIn(user);
        // reset form inputs
        setFormData(INITIAL_STATE);
        // redirect to homepage
        history.push('/')
    }

    return (
        <div className="Login-card">
            <h1 className="Login-title">Login</h1>
            <div>
                <form className="Login-form" data-testid="Login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="Login-label">Username</label>
                    <input type="text"
                            id="username"
                            name="username"
                            data-testid="Login-form-username-input"
                            value={formData.username}
                            onChange={handleChange}
                            className="Login-input"
                    />
                    <label htmlFor="password" className="Login-label">Password</label>
                    <input type="password"
                            id="password"
                            name="password"
                            data-testid="Login-form-password-input"
                            value={formData.password}
                            onChange={handleChange}
                            className="Login-input"
                    />
                    <button type="submit"
                            className="Login-button" 
                            data-testid="Login-form-button"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default LogInForm;