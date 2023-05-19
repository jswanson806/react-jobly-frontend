import React from "react";
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import NavBar from './NavBar.js';
import AppContext from "./helpers/AppContext.js";
import { Router, MemoryRouter } from "react-router-dom";
import {createMemoryHistory} from 'history';
import '@testing-library/jest-dom';

const logOut = jest.fn();

const history = createMemoryHistory();

let token;
let user;

beforeEach(() => {
    token = 'abcdefg';
})

user = {
    username: "testuser",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@email.com"
}

describe('NavBar smoke and snapshot', () => {

    it('should render without crashing', async () => {

        render(
            <AppContext.Provider value={{token, user, logOut}}>
                <MemoryRouter>
                    <NavBar/>
                </MemoryRouter>
            </AppContext.Provider>
        )
    });

    it('should match the snapshot', async () => {

        const {asFragment} = render(
            <AppContext.Provider value={{token, user, logOut}}>
                <MemoryRouter>
                    <NavBar/>
                </MemoryRouter>
            </AppContext.Provider>
        )
        expect(asFragment()).toMatchSnapshot();
    });

})

describe('NavBar handles navigation correctly', () => {
 
    it('should render correct links if user is logged in', async () => {
        
        render(
            <AppContext.Provider value={{token, user, logOut}}>
                <Router history={history}>
                    <NavBar/>
                </Router>
            </AppContext.Provider>
        )

        const logoutBtn = screen.getByTestId('logout-button')
        
        expect(logoutBtn).toBeInTheDocument();
        expect(screen.queryByTestId('signup-link')).toBe(null);
        expect(screen.queryByTestId('login-link')).toBe(null);

    });

    it('should render correct links if user is logged out', async () => {
        
        token = '';

        render(
            <AppContext.Provider value={{token, user, logOut}}>
                <Router history={history}>
                    <NavBar/>
                </Router>
            </AppContext.Provider>
        )


        const signup = screen.getByTestId('signup-link')
        const loginLink = screen.getByTestId('login-link')

        expect(signup).toBeInTheDocument();
        expect(loginLink).toBeInTheDocument();
        expect(screen.queryByTestId('logout-button')).toBe(null);

    });

    it('should navigate to correct routes', async () => {
        
        render(
            <AppContext.Provider value={{token, user, logOut}}>
                <Router history={history}>
                    <NavBar/>
                </Router>
            </AppContext.Provider>
        )

        const logoutBtn = screen.getByTestId('logout-button')
        const companiesLink = screen.getByTestId('companies-link')
        const jobsLink = screen.getByTestId('jobs-link')
        const profileLink = screen.getByTestId('profile-link')
        const brandLink = screen.getByTestId('brand-link')

        fireEvent.click(companiesLink);
        expect(history.location.pathname).toBe('/companies');
        fireEvent.click(jobsLink);
        expect(history.location.pathname).toBe('/jobs');
        fireEvent.click(profileLink);
        expect(history.location.pathname).toBe('/profile');
        fireEvent.click(brandLink);
        expect(history.location.pathname).toBe('/');
        fireEvent.click(logoutBtn);
        expect(history.location.pathname).toBe('/');

    });

    it('should navigate to correct routes', async () => {

        token = '';

        render(
            <AppContext.Provider value={{token, user, logOut}}>
                <Router history={history}>
                    <NavBar/>
                </Router>
            </AppContext.Provider>
        )

        const signup = screen.getByTestId('signup-link')
        const loginLink = screen.getByTestId('login-link')

        fireEvent.click(signup);
        expect(history.location.pathname).toBe('/signup');
        fireEvent.click(loginLink);
        expect(history.location.pathname).toBe('/login');
    });

})
