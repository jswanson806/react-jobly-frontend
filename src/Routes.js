import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home.js';
import CompanyList from './CompanyList.js';
import JobsList from './JobsList.js'
import CompanyDetails from './CompanyDetails.js';
import LogInForm from './LogInForm.js';
import SignupForm from './SignupForm.js';
import UpdateProfileForm from './UpdateProfileForm.js';
import NotFound from './NotFound.js';
import JoblyApi from './api.js';
import FormContext from './helpers/FormContext.js';
import { TokenContext } from './helpers/TokenContext.js';

/**
 * Routes Component
 *
 * Renders the main routing logic for the application, mapping different routes to their respective components.
 * It also manages the state of jobs and companies fetched from the database, as well as handling form filtering.
 * Requires the `TokenContext` and `FormContext` to be provided by a parent component.
 */


const Routes = () => {
    const {token} = useContext(TokenContext);

    const loggedIn = !token || token === "" ? false : true
    //
    const [jobs, setJobs] = useState([]);
    // tracks state of companies
    const [ companies, setCompanies ] = useState([]);

    // gets companies and from the database and adds them to companies state
    useEffect(() => {
        async function getCompanies() {
            let res = await JoblyApi.getCompanies();
            setCompanies(res.companies);
        };
        // calls the getCompanies async function
        getCompanies();
    }, [])

    // gets all jobs from the database and adds them to jobs state
    useEffect(() => {
        async function getJobs() {
            const res = await JoblyApi.getJobs();
            setJobs(res.jobs)
        };
        // calls the getjobs async function
        getJobs();
    }, [])

    const filterItems = async (filters) => {
        let res = '';
        // if filters includes 'title' it is a filter for jobs
        Object.keys(filters).includes('title') 
        ? 
        res = await JoblyApi.getJobs(filters) 
        // otherwise, it is a filter for companies
        : 
        res = await JoblyApi.getCompanies(filters)

        return res;
    }

    // checks the state of the page loading and renders a loading message if true
    if(jobs.length === 0 || companies.length === 0) {
         return <p data-testid="Loading">Loading &hellip;</p>;
    };

    return (
            <FormContext.Provider value={{filterItems}} data-testid="formcontext">
                <main data-testid="routes">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/companies">
                            {loggedIn ? <CompanyList companies={companies} filterItems={filterItems}/>  : <Redirect to="/login" />}
                        </Route>
                        <Route exact path="/companies/:handle">
                            {loggedIn ? <CompanyDetails /> : <Redirect to="/login" />}
                        </Route>
                        <Route exact path="/jobs">
                            {loggedIn ? <JobsList jobs={jobs} filterItems={filterItems} /> : <Redirect to="/login" />}
                        </Route>
                        <Route exact path="/login">
                            <LogInForm />
                        </Route>
                        <Route exact path="/signup">
                            <SignupForm />
                        </Route>
                        <Route exact path="/profile">
                            {loggedIn ? <UpdateProfileForm />
                            : <Redirect to="/login" />}
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>
                </main>
            </FormContext.Provider>
    )
}

export default Routes;