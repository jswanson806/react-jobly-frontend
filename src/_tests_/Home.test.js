import React from "react";
import {render} from '@testing-library/react';
import Home from "../Home.js";
import "@testing-library/jest-dom";
import { UserContext } from "../helpers/UserContext.js";


let user = {
    username: "testuser",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@email.com",
    applications: []
}

describe('JobCard smoke and snapshot', () => {

    it('should render without crashing', async () => {
        render(
        <UserContext.Provider value={{user}}>
             <Home />
         </UserContext.Provider>
        )
    });

    it('should match the snapshot', async () => {
        const {asFragment} = render(
        <UserContext.Provider value={{user}}>
            <Home />
        </UserContext.Provider>
            )
        expect(asFragment()).toMatchSnapshot();
    });

});

describe('Conditional rendering test', () => {

    it('should render greeting message if user is logged in', async () => {
        const {getByTestId, queryByTestId} = render(
        <UserContext.Provider value={{user}}>
            <Home />
        </UserContext.Provider>
        )
        expect(getByTestId("Home-greeting-message")).toBeInTheDocument();
        expect(queryByTestId("Home-login-message")).toEqual(null);
    });

    it('should render login message if user is not logged in', async () => {
        user = {};
        const {getByTestId, queryByTestId} = render(
        <UserContext.Provider value={{user}}>
            <Home />
        </UserContext.Provider>
        )
        expect(getByTestId("Home-login-message")).toBeInTheDocument();
        expect(queryByTestId("Home-greeting-message")).toEqual(null);
    });

});