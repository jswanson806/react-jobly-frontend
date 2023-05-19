import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App.js';
import { UserContext } from './helpers/UserContext.js';
import { TokenContext } from './helpers/TokenContext.js';



// ************************* Setup *************************

let user = {
  username: "testuser",
  password: "password",
  firstName: "firstName",
  lastName: "lastName",
  email: "test@email.com",
  applications: []
}

jest.mock('./Routes.js', () => {
  return () => <div data-testid="mocked-routes" />;
});

jest.mock('./NavBar.js', () => {
  return () => <div data-testid="mocked-navbar"/>
});

// ************************* Tests *************************

describe('App component smoke and snapshot', () => {

  it('should render the App component', async () => {
    // ensure that all state updates and side effects have been processed by wrapping in act()
    await act(async () => {render(
      // wrapping in MemoryRouter to provide a context for Route to match URL
        <UserContext.Provider value={{user}}>
          <TokenContext.Provider value={""}>
            <App />
          </TokenContext.Provider>
        </UserContext.Provider>
      );
    });
   
  });

  it('should match the snapshot', async () => {
    let asFragment;

    await act(async () => {const {asFragment: fragment} = render(
      <UserContext.Provider value={{user}}>
      <TokenContext.Provider value={""}>
          <App />
        </TokenContext.Provider>
      </UserContext.Provider>
      );
      asFragment = fragment;
    });

    expect(asFragment()).toMatchSnapshot();

  });

});


describe('Child component rendering', () => {

  it('should render the NavBar component', async () => {
    await act( async () => {
      render(
        <UserContext.Provider value={{user}}>
          <TokenContext.Provider value={""}>
              <App />
          </TokenContext.Provider>
        </UserContext.Provider>
      );
    });

    const navbarComponent = screen.getByTestId("mocked-navbar");
    expect(navbarComponent).toBeInTheDocument();

  });

  it('should render the Routes component', async () => {
    await act( async () => {
      render(
        <UserContext.Provider value={{user}}>
          <TokenContext.Provider value={""}>
            <App />
          </TokenContext.Provider>
        </UserContext.Provider>
      )  
    });

      const navbarComponent = screen.getByTestId('mocked-routes');
      expect(navbarComponent).toBeInTheDocument();
    
  });


});
