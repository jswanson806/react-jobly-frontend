import React from "react";
import {act, render, screen, fireEvent} from '@testing-library/react';
import UpdateProfileForm from './UpdateProfileForm.js';
import AppContext from "./helpers/AppContext.js";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom';
import { UserContext } from "./helpers/UserContext.js";


const updateUserProfile = jest.fn();
const user = {
    username: "testuser",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@email.com"
}

describe("login form smoke and snapshot tests", () => {

    it("should render without crashing", async () => {

        await act(async () => {render(
            <UserContext.Provider value={{user}}>
                <AppContext.Provider value={{updateUserProfile}}>
                    <MemoryRouter>
                        <UpdateProfileForm />
                    </MemoryRouter>
                </AppContext.Provider>
            </UserContext.Provider>
        )
        });
    });

    it("should match snapshot", async() => {
        let asFragment;

        await act(async () => {const {asFragment: fragment} = render(
            <UserContext.Provider value={{user}}>
                <AppContext.Provider value={{updateUserProfile}}>
                    <MemoryRouter>
                        <UpdateProfileForm />
                    </MemoryRouter>
                </AppContext.Provider>
            </UserContext.Provider>
        )
        asFragment = fragment;
        });

        expect(asFragment()).toMatchSnapshot();
    })
})

describe("Handles form input correctly", () => {

    it('updates search input correctly', async () => {
        await act(async () => {render(
            <UserContext.Provider value={{user}}>
                <AppContext.Provider value={{updateUserProfile}}>
                    <MemoryRouter>
                        <UpdateProfileForm />
                    </MemoryRouter>
                </AppContext.Provider>
            </UserContext.Provider>
        )
        });

        const userNameInput = screen.getByTestId("Profile-form-username-input");
        const firstNameInput = screen.getByTestId("Profile-form-firstName-input");
        const lastNameInput = screen.getByTestId("Profile-form-lastName-input");
        const emailInput = screen.getByTestId("Profile-form-email-input");
        // this should not change from 'testuser' because input is disabled
        fireEvent.change(userNameInput, {target: {value: "testUserName"}});
        // these should all change
        fireEvent.change(firstNameInput, {target: {value: "testFirstName"}});
        fireEvent.change(lastNameInput, {target: {value: "testLastName"}});
        fireEvent.change(emailInput, {target: {value: "test@email.com"}});

        expect(userNameInput).toHaveValue("testuser");
        expect(firstNameInput).toHaveValue("testFirstName");
        expect(lastNameInput).toHaveValue("testLastName");
        expect(emailInput).toHaveValue("test@email.com");

    })

    it('handles form submission correctly', async () => {
        const history = createMemoryHistory();
        history.push = jest.fn();
        await act(async () => {render(
            <UserContext.Provider value={{user}}>
                <AppContext.Provider value={{updateUserProfile}}>
                    <Router history={history}>
                        <UpdateProfileForm />
                    </Router>
                </AppContext.Provider>
            </UserContext.Provider>
        )
        });

        const form = screen.getByTestId("Profile-form")

        const userNameInput = screen.getByTestId("Profile-form-username-input");
        const firstNameInput = screen.getByTestId("Profile-form-firstName-input");
        const lastNameInput = screen.getByTestId("Profile-form-lastName-input");
        const emailInput = screen.getByTestId("Profile-form-email-input");
        // this should not change from 'testuser' because input is disabled
        fireEvent.change(userNameInput, {target: {value: "testUserName"}});
        // these should all change
        fireEvent.change(firstNameInput, {target: {value: "testFirstName"}});
        fireEvent.change(lastNameInput, {target: {value: "testLastName"}});
        fireEvent.change(emailInput, {target: {value: "test1@email.com"}});

        // submit the form
        fireEvent.submit(form);

        // check for function calls
        expect(updateUserProfile).toHaveBeenCalledTimes(1);
        expect(updateUserProfile).toHaveBeenCalledWith({
            username: "testuser",
            firstName: "testFirstName",
            lastName: "testLastName",
            email: "test1@email.com"
        });
        expect(history.push).toHaveBeenCalledTimes(1);
        expect(history.push).toHaveBeenCalledWith('/');

    })

})