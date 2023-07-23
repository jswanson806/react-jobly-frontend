import React from "react";
import {render, screen} from '@testing-library/react';
import JobCard from "../JobCard.js";
import '@testing-library/jest-dom';
import { UserContext } from "../helpers/UserContext.js";


const user = {
    username: "testuser",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@email.com",
    applications: [ 9999 ]
}

const job = {
    id: 9999,
    title: "Test Job Title 1",
    salary: 123456,
    equity: 0.5,
}

describe('JobCard smoke and snapshot', () => {

    it('should render without crashing', async () => {
       render(
        <UserContext.Provider value={{user}}>
            <JobCard job={job} user={user}/>
        </UserContext.Provider>
       )
    });

    it('should match the snapshot', async () => {
        const {asFragment} = render(
            <UserContext.Provider value={{user}}>
                <JobCard job={job} user={user}/>
            </UserContext.Provider>);
        expect(asFragment()).toMatchSnapshot();
    });

});

describe('Should render the correct content', () => {

    it('should have the correct job info', () => {
        render(
            <UserContext.Provider value={{user}}>
                <JobCard job={job} user={user}/>
            </UserContext.Provider>
        );
        
        const title = screen.getByTestId('Job-title')
        const salary = screen.getByTestId('Job-salary')
        const equity = screen.getByTestId('Job-equity')

        expect(title).toHaveTextContent('Test Job Title 1')
        expect(salary).toHaveTextContent(123456)
        expect(equity).toHaveTextContent(0.5)
    })

    it('should render the JobCard "Apply" button as deactive', async () => {
       const {getByTestId} = render(
        <UserContext.Provider value={{user}}>
            <JobCard job={job} user={user}/>
        </UserContext.Provider>
    )
        
        // check for the button to be deactive becuase the application is present in users.
       expect(getByTestId("Job-apply-button-deactive")).toBeInTheDocument()
       expect(screen.queryByTestId("Job-apply-button-deactive")).not.toBe(null)
       expect(screen.queryByTestId("Job-apply-button-active")).toBe(null)
    
    });

    it('should render the JobCard "Apply" button as active', async () => {
        // remove the application from user
        user.applications.pop();

        const {getByTestId} = render(
            <UserContext.Provider value={{user}}>
                <JobCard job={job} user={user}/>
            </UserContext.Provider>
        )
        
        // check for the button to be active becuase the application is not present in users.
        expect(getByTestId("Job-apply-button-active")).toBeInTheDocument()
        expect(screen.queryByTestId("Job-apply-button-active")).not.toBe(null)
        expect(screen.queryByTestId("Job-apply-button-deactive")).toBe(null)
    
    });

});