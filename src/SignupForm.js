import React, { useState, useContext  } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "./helpers/AppContext.js";
import './SignupForm.css';

/**
 * SignupForm Component
 *
 * Renders a signup form and handles user registration functionality.
 *
 * State:
 * - formData: Tracks the state of the signup form data.
 *
 * Hooks:
 * - useContext: Accesses the registerUser function from the AppContext.
 *
 * Functions:
 * - handleChange: Updates the formData state as the user types in the input fields.
 * - handleSubmit: Submits the signup form, calls the registerUser function, resets form inputs, and redirects to the homepage.
 */


const SignupForm = () => {
    const {registerUser} = useContext(AppContext);
    // initial value of formData
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }

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

    // submit the form data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // set the input as the value of 'name' in filters
        const user = {
            username: formData.username,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        }
        //
        await registerUser(user);
        // reset form inputs
        setFormData(INITIAL_STATE);
        // redirect to homepage
        history.push('/')
    }

    return (
        <div className="Signup-card">
            <h1 className="Signup-title">Signup</h1>
            <div>
                <form className="Signup-form" data-testid="Signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text"
                            id="username"
                            name="username"
                            data-testid="Signup-form-username-input"
                            value={formData.username}
                            onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input type="password"
                            id="password"
                            name="password"
                            data-testid="Signup-form-password-input"
                            value={formData.password}
                            onChange={handleChange}
                    />
                    <label htmlFor="firstName">First Name</label>
                    <input type="text"
                            id="firstName"
                            name="firstName"
                            data-testid="Signup-form-firstName-input"
                            value={formData.firstName}
                            onChange={handleChange}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text"
                            id="lastName"
                            name="lastName"
                            data-testid="Signup-form-lastName-input"
                            value={formData.lastName}
                            onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input type="text"
                            id="email"
                            name="email"
                            data-testid="Signup-form-email-input"
                            value={formData.email}
                            onChange={handleChange}
                    />
                    <button type="submit" 
                            data-testid="Signup-form-button"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
        
    );
};

export default SignupForm;