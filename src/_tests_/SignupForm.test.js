import React from "react";
import {act, render, screen, fireEvent} from '@testing-library/react';
import SignupForm from '../SignupForm.js';
import AppContext from "../helpers/AppContext.js";
import { MemoryRouter } from "react-router-dom";

import '@testing-library/jest-dom';


const registerUser = jest.fn();

describe("login form smoke and snapshot tests", () => {

    it("should render without crashing", async () => {

        await act(async () => {render(
            <AppContext.Provider value={{registerUser}}>
                <MemoryRouter>
                    <SignupForm />
                </MemoryRouter>
            </AppContext.Provider>
        )
        });
    });

    it("should match snapshot", async() => {
        let asFragment;

        await act(async () => {const {asFragment: fragment} = render(
            <AppContext.Provider value={{registerUser}}>
                <MemoryRouter>
                    <SignupForm />
                </MemoryRouter>
            </AppContext.Provider>
        )
        asFragment = fragment;
        });

        expect(asFragment()).toMatchSnapshot();
    })
})

describe("Handles form input correctly", () => {

    it('updates search input correctly', async () => {
        await act(async () => {render(
            <AppContext.Provider value={{registerUser}}>
                <MemoryRouter>
                    <SignupForm />
                </MemoryRouter>
            </AppContext.Provider>
        )
        });

        const userNameInput = screen.getByTestId("Signup-form-username-input");
        const firstNameInput = screen.getByTestId("Signup-form-firstName-input");
        const lastNameInput = screen.getByTestId("Signup-form-lastName-input");
        const passwordInput = screen.getByTestId("Signup-form-password-input");
        const emailInput = screen.getByTestId("Signup-form-email-input");
        fireEvent.change(userNameInput, {target: {value: "testUserName"}});
        fireEvent.change(firstNameInput, {target: {value: "testFirstName"}});
        fireEvent.change(lastNameInput, {target: {value: "testLastName"}});
        fireEvent.change(passwordInput, {target: {value: "password"}});
        fireEvent.change(emailInput, {target: {value: "test@email.com"}});
        expect(userNameInput).toHaveValue("testUserName");
        expect(firstNameInput).toHaveValue("testFirstName");
        expect(lastNameInput).toHaveValue("testLastName");
        expect(passwordInput).toHaveValue("password");
        expect(emailInput).toHaveValue("test@email.com");

    })

})

describe("Handles form submission correctly", () => {

    it('submits with correct data', async () => {
        await act(async () => {render(
            <AppContext.Provider value={{registerUser}}>
                <MemoryRouter>
                    <SignupForm />
                </MemoryRouter>
            </AppContext.Provider>
        )
        });

        const userNameInput = screen.getByTestId("Signup-form-username-input");
        const firstNameInput = screen.getByTestId("Signup-form-firstName-input");
        const lastNameInput = screen.getByTestId("Signup-form-lastName-input");
        const passwordInput = screen.getByTestId("Signup-form-password-input");
        const emailInput = screen.getByTestId("Signup-form-email-input");
        fireEvent.change(userNameInput, {target: {value: "testUserName"}});
        fireEvent.change(firstNameInput, {target: {value: "testFirstName"}});
        fireEvent.change(lastNameInput, {target: {value: "testLastName"}});
        fireEvent.change(passwordInput, {target: {value: "password"}});
        fireEvent.change(emailInput, {target: {value: "test@email.com"}});
        
        const btn = screen.getByTestId("Signup-form-button");

        await act(async () => {
            fireEvent.click(btn);
        })

        expect(registerUser).toHaveBeenCalledWith({
            username: "testUserName",
            password: "password",
            firstName: "testFirstName",
            lastName: "testLastName",
            email: "test@email.com"
        })

    })

})