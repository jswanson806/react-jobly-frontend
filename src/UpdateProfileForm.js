import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "./helpers/AppContext.js";
import './UpdateProfileForm.css';
import { UserContext } from "./helpers/UserContext.js";

/**
 * UpdateProfileForm Component
 *
 * Renders a form to update user profile information and handles the update functionality.
 *
 * State:
 * - formData: Tracks the state of the form data.
 *
 * Hooks:
 * - useContext: Accesses the updateUserProfile function from the AppContext and user information from the UserContext.
 *
 * Functions:
 * - handleChange: Updates the formData state as the user types in the input fields.
 * - handleSubmit: Submits the form, calls the updateUserProfile function, resets form inputs, and redirects to the homepage.
 */


const UpdateProfileForm = () => {

    const {updateUserProfile} = useContext(AppContext);
    const {user} = useContext(UserContext)
    // initial value of formData
    const INITIAL_STATE = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
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
        const newUserInfo = {
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email
        }
        // call updateUserProfile from parent App.js
        updateUserProfile(newUserInfo);
        // reset form inputs
        setFormData(INITIAL_STATE);
        // redirect to homepage
        history.push('/')
    }

    return (
        <div className="profile-card">
            <h1 className="profile-title">Profile</h1>
            <div>
                <form className="Profile-form" data-testid="Profile-form" onSubmit={handleSubmit}>
                    <label htmlFor="username" className="profile-label">Username</label>
                    <input type="text"
                            id="username"
                            name="username"
                            data-testid="Profile-form-username-input"
                            value={formData.username}
                            disabled
                            tabIndex="-1"
                            className="profile-input"
                    />
                    <label htmlFor="firstName" className="profile-label">First Name</label>
                    <input type="text"
                            id="firstName"
                            name="firstName"
                            data-testid="Profile-form-firstName-input"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="profile-input"
                    />
                    <label htmlFor="lastName" className="profile-label">Last Name</label>
                    <input type="text"
                            id="lastName"
                            name="lastName"
                            data-testid="Profile-form-lastName-input"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="profile-input"
                    />
                    <label htmlFor="email" className="profile-label">Email</label>
                    <input type="text"
                            id="email"
                            name="email"
                            data-testid="Profile-form-email-input"
                            value={formData.email}
                            onChange={handleChange}
                            className="profile-input"
                    />
                    <button type="submit" 
                            data-testid="Profile-form-button"
                            className="profile-button"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>

    );
};

export default UpdateProfileForm;