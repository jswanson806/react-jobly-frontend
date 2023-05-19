import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './App.css';
import Routes from './Routes.js';
import NavBar from './NavBar.js';
import JoblyApi from './api.js';
import AppContext from './helpers/AppContext.js';
import { UserContext } from './helpers/UserContext.js';
import { TokenContext } from './helpers/TokenContext.js';

/**
 * App Component
 *
 * The root component of the application. Manages user authentication, routing, and global state.
 *
*/

function App() {

  const history = useHistory();

  // ********************* State *********************

  const {user, setUser} = useContext(UserContext);
  const {token, setToken} = useContext(TokenContext);

  // ********************* Hooks *********************

  // keep token saved between page refreshes
  // set token to the value in localStorage
  useEffect(() => {
    // get the value of 'token' from localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    // check for value of stored token to be different than stateful token
    if(storedToken !== token && storedToken !== null) {
      // set token to the value in localStorage
      setToken(storedToken);
    }
  // check for value of stored user to be different than stateful user
    if(storedUser !== user && storedUser !== null) {
      // turn the stringified user object in localStorage into an object and set user state
      setUser(JSON.parse(storedUser))
    }

    // only run on first render
  }, [])

  // ********************* Functions *********************

  // registers a new user and logs them in
  const registerUser = async (userInfo) => {
    // api method registers user
    await JoblyApi.registerUser(userInfo);
    // calls logIn function to log in the newly registered user
    logIn(userInfo);
  }

  // logs in an existing user
  const logIn = async ({username, password}) => {
    // authenticates user
    let resToken = await JoblyApi.logInUser(username, password);
    // set token in localStorage and state
    localStorage.setItem('token', resToken);
    setToken(resToken);
    // setLocalToken(resToken)
    // sets api token to token received after authentication
    JoblyApi.token = resToken;
    // get the user from the database
    let userRes = await JoblyApi.getUser(username);
    // stringify user object and set user info in localStorage and state
    localStorage.setItem('user', JSON.stringify(userRes.user));
    setUser(userRes.user);
  }

  // logs out user
  const logOut = async () => {
    // reset api token
    JoblyApi.token = "";
    // clear localStorage'token' and 'user'
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // reset state of 'token' and 'user'
    setToken("")
    setUser("")
    // redirect to home
    history.push('/');
  }

  // calls api to patch user info
  const updateUserProfile = async (newUserInfo) => {
    const {applications} = user;
    await JoblyApi.patchUser(newUserInfo);
    // set user info state and user info in localStorage to new user info
    // res.user.applications = user.applications
    newUserInfo.applications = applications;
    setUser(newUserInfo);
  }

  // ********************* Return *********************

  return (
    // AppContext provides functions and user and token state to child components
    <AppContext.Provider value={{user, setUser, token, setToken, registerUser, logIn, logOut, updateUserProfile}} >
          <div data-testid="app">
            <NavBar />
            <Routes />
          </div>
    </AppContext.Provider>
  )
}

export default App;