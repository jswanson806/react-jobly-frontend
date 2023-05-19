import React from 'react';
import { render, act, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Routes from './Routes.js'
import { TokenContext } from './helpers/TokenContext.js';
import JoblyApi from './api.js';
import { MemoryRouter } from 'react-router-dom';
import App from './App.js';
import { UserContext } from './helpers/UserContext.js';
import AppContext from './helpers/AppContext.js';

let token = "testToken";

let user = {
    username: "testuser",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@email.com",
    applications: []
  }

jest.mock('./api.js')



beforeEach(() => {
    JoblyApi.getCompanies.mockResolvedValueOnce({ companies: [""] });
    JoblyApi.getJobs.mockResolvedValueOnce({ jobs: [""] });
})
/** ********************* smoke / snapshot tests ********************* */

describe('routes', () => {

    it("should render without crashing", async () => {

        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={token}>
                    <MemoryRouter>
                        <Routes />
                     </MemoryRouter>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })
    });

    it("should match snapshot", async () => {

        let asFragment;

        await act(async () => {
            const {asFragment: fragment} = render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <MemoryRouter>
                        <Routes />
                     </MemoryRouter>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
            asFragment = fragment;
        })
        expect(asFragment()).toMatchSnapshot();
    })
})


describe("Routes correctly", () => {

    it("should route to '/'", async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <MemoryRouter initialEntries={['/']}>
                        <Routes />
                     </MemoryRouter>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Home-content")).toBeInTheDocument();
    })

    it("should route to '/companies'", async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <MemoryRouter initialEntries={['/companies']}>
                        <Routes />
                     </MemoryRouter>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Company-list")).toBeInTheDocument();
    })

    it("should route to '/companies/:handle'", async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <MemoryRouter initialEntries={['/companies/testcompany']}>
                        <Routes />
                     </MemoryRouter>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Company-detail")).toBeInTheDocument();
    })

    it("should route to '/jobs'", async () => {
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <MemoryRouter initialEntries={['/jobs']}>
                        <Routes />
                     </MemoryRouter>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Job-list")).toBeInTheDocument();
    })

    it("should route to '/login'", async () => {
        const logIn = jest.fn();
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <AppContext.Provider value={{logIn}}>
                        <MemoryRouter initialEntries={['/login']}>
                            <Routes />
                        </MemoryRouter>
                    </AppContext.Provider>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Login-form")).toBeInTheDocument();
    })

    it("should route to '/signup'", async () => {
        const registerUser = jest.fn();
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <AppContext.Provider value={{registerUser}}>
                        <MemoryRouter initialEntries={['/signup']}>
                            <Routes />
                        </MemoryRouter>
                    </AppContext.Provider>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Signup-form")).toBeInTheDocument();
    })

    it("should route to '/profile'", async () => {
        const registerUser = jest.fn();
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <AppContext.Provider value={{registerUser}}>
                        <MemoryRouter initialEntries={['/profile']}>
                            <Routes />
                        </MemoryRouter>
                    </AppContext.Provider>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Profile-form")).toBeInTheDocument();
    })

    it("should render NotFound if no url matches", async () => {
        const registerUser = jest.fn();
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <AppContext.Provider value={{registerUser}}>
                        <MemoryRouter initialEntries={['/notValidUrl']}>
                            <Routes />
                        </MemoryRouter>
                    </AppContext.Provider>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Not-found")).toBeInTheDocument();
    })

})

describe("Routes redirects", () => {

    it("should redirect from '/companies' to '/login' if user is logged out", async () => {
        const logIn = jest.fn();
        token = "";
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <AppContext.Provider value={{logIn}}>
                        <MemoryRouter initialEntries={['/companies']}>
                            <Routes />
                        </MemoryRouter>
                    </AppContext.Provider>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Login-form")).toBeInTheDocument();

    })

    it("should redirect from '/jobs' to '/login' if user is logged out", async () => {
        const logIn = jest.fn();
        token = "";
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <AppContext.Provider value={{logIn}}>
                        <MemoryRouter initialEntries={['/jobs']}>
                            <Routes />
                        </MemoryRouter>
                    </AppContext.Provider>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Login-form")).toBeInTheDocument();

    })

    it("should redirect from '/companies/:handle' to '/login' if user is logged out", async () => {
        const logIn = jest.fn();
        token = "";
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <AppContext.Provider value={{logIn}}>
                        <MemoryRouter initialEntries={['/companies/testcompany']}>
                            <Routes />
                        </MemoryRouter>
                    </AppContext.Provider>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Login-form")).toBeInTheDocument();

    })

    it("should redirect from '/profile' to '/login' if user is logged out", async () => {
        const logIn = jest.fn();
        token = "";
        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                <TokenContext.Provider value={{token}}>
                    <AppContext.Provider value={{logIn}}>
                        <MemoryRouter initialEntries={['/profile']}>
                            <Routes />
                        </MemoryRouter>
                    </AppContext.Provider>
                </TokenContext.Provider>
                </UserContext.Provider>
            );
        })

        expect(screen.getByTestId("Login-form")).toBeInTheDocument();

    })
    
})