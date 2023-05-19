import React from "react";
import {act, render, screen, fireEvent} from '@testing-library/react';
import SignInForm from './LogInForm.js';
import AppContext from "./helpers/AppContext.js";
import { MemoryRouter } from "react-router-dom";

import '@testing-library/jest-dom';


const logIn = jest.fn();

describe("login form smoke and snapshot tests", () => {

    it("should render without crashing", async () => {

        await act(async () => {render(
            <AppContext.Provider value={{logIn}}>
                <MemoryRouter>
                    <SignInForm />
                </MemoryRouter>
            </AppContext.Provider>
        )
        });
    });

    it("should match snapshot", async() => {
        let asFragment;

        await act(async () => {const {asFragment: fragment} = render(
            <AppContext.Provider value={{logIn}}>
                <MemoryRouter>
                    <SignInForm />
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
            <AppContext.Provider value={{logIn}}>
                <MemoryRouter>
                    <SignInForm />
                </MemoryRouter>
            </AppContext.Provider>
        )
        });

        const userNameInput = screen.getByTestId("Login-form-username-input");
        const passwordInput = screen.getByTestId("Login-form-password-input");
        fireEvent.change(userNameInput, {target: {value: "testName"}});
        fireEvent.change(passwordInput, {target: {value: "password"}});
        expect(userNameInput).toHaveValue("testName");
        expect(passwordInput).toHaveValue("password");

    })

    it('should handle form submission', async () => {
        await act(async () => {render(
            <AppContext.Provider value={{logIn}}>
                <MemoryRouter>
                    <SignInForm />
                </MemoryRouter>
            </AppContext.Provider>
        )
        });

        const userNameInput = screen.getByTestId("Login-form-username-input");
        const passwordInput = screen.getByTestId("Login-form-password-input");
        fireEvent.change(userNameInput, {target: {value: "testName"}});
        fireEvent.change(passwordInput, {target: {value: "password"}});

        const btn = screen.getByTestId("Login-form-button");

        await act(async () => {
            fireEvent.click(btn);
        })

        expect(logIn).toHaveBeenCalledWith({ 
            username: "testName", 
            password: "password" 
        })
    })

})