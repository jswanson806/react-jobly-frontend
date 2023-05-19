import React from "react";
import CompanyDetails from "./CompanyDetails.js";
import { act, render, waitFor, getByTestId, screen} from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import '@testing-library/jest-dom';
import JoblyApi from "./api.js";
import { UserContext } from "./helpers/UserContext.js";

jest.mock('./api');

const user = {
    username: "testuser",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@email.com",
    applications: []
}

const company = {
    handle: "test-company-1",
    name: "Test Company 1",
    num_employees: 9999,
    description: "Test description for Test Company 1",
    jobs: [
      {
        id: 9999,
        title: "Test Job Title 1",
        salary: 123456,
        equity: 0.5,
      },
    ],
}


describe('CompanyDetails smoke and snapshot', () => {

    
    it('should render without crashing', async () => {

        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                    <MemoryRouter>
                        <CompanyDetails />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        })
    });


    it('should match the snapshot', async () => {
        let asFragment;
        await act(async () => {const {asFragment: fragment} = render(
            <UserContext.Provider value={{user}}>
                <MemoryRouter>
                    <CompanyDetails />
                </MemoryRouter>
            </UserContext.Provider>
            );
            asFragment = fragment;
        });
        
        expect(asFragment()).toMatchSnapshot();
    });

});

describe('Render with correct data', () => {

    it('should render JobCard components correctly', async () => {
        // mock call to api to get company
       JoblyApi.getCompany.mockReturnValueOnce(company);

        await act(async () => {
            render(
                <UserContext.Provider value={{user}}>
                    <MemoryRouter>
                        <CompanyDetails />
                    </MemoryRouter>
                </UserContext.Provider>
            )
        })

        // wait for the asyncronous function call
        waitFor(() => {
            expect(getByTestId('Job-apply-button-active')).toBeInTheDocument();
        })

        // expect a single call to the api upon render from useEffect hook
        expect(JoblyApi.getCompany).toHaveBeenCalledTimes(1);

        //JobCard component has been rendered
        const jobCardButton = screen.getByTestId('Job-apply-button-active')
        expect(jobCardButton).toBeInTheDocument();

        //JobCard was only rendered once because company.jobs contains only one item
        expect(screen.getAllByTestId('Job-apply-button-active').length).toBe(1)
    });

})