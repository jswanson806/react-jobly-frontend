import React from 'react';
import { MemoryRouter} from 'react-router-dom';
import { act, render, waitFor, screen, fireEvent} from '@testing-library/react';
import JobsList from '../JobsList.js';
import {UserContext} from '../helpers/UserContext.js';
import '@testing-library/jest-dom'
import JoblyApi from '../api.js';

const user = {
    username: "testuser",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    email: "test@email.com",
    applications: []
}

const jobs = [
    {
        id: 9999,
        title: "Test Job Title 1",
        salary: 1111,
        equity: 0.1,
        company_handle: "test-company-handle-1"
    },
    {
        id: 8888,
        title: "Test Job Title 2",
        salary: 78912,
        equity: 0.2,
        company_handle: "test-company-handle-2"
    }
]

jest.mock('./api')

const mockFilterItems = jest.fn();

describe('JobsList smoke and snapshot', () => {
    it('should render without crashing', async () => {

    await act(async () => {
        render(
            <UserContext.Provider value={{user}}>
                <MemoryRouter>
                    <JobsList jobs={jobs} filterItems={mockFilterItems}/>
                </MemoryRouter>
            </UserContext.Provider>
        );
    })

    });


    it('should match the snapshot', async () => {
        await act(async () => {const {asFragment} = render(
            <UserContext.Provider value={{user}}>
                <MemoryRouter>
                    <JobsList jobs={jobs} filterItems={mockFilterItems}/>
                </MemoryRouter>
            </UserContext.Provider>
        );
        expect(asFragment()).toMatchSnapshot();
    });

    })

});

describe('Renders correct content', () => {

    it('should render JobCards', async () => {
        JoblyApi.getJobs = jest.fn().mockResolvedValueOnce({
            id: 7777,
            title: 'Test Job 3',
            salary: 3333,
            equity: 0.3,
            company_handle: 'test-company-handle-3'
        })

        await act(async () => {render(
            <UserContext.Provider value={{user}}>
                <MemoryRouter>
                    <JobsList jobs={jobs} filterItems={mockFilterItems}/>
                </MemoryRouter>
            </UserContext.Provider>
            ); 
        });

        // wait for the content to finish rendering
        await waitFor(() => {
            expect(screen.getAllByTestId("Job-title").length).toBeGreaterThan(0);
        })
        // rendered 2 company cards because companies contains only 2 companies
        expect(screen.getAllByTestId("Job-title").length).toBe(2)
    })

    it('should render text field with empty string value', async () => {
        await act(async () => {render(
            <UserContext.Provider value={{user}}>
                <MemoryRouter>
                    <JobsList jobs={jobs} filterItems={mockFilterItems}/>
                </MemoryRouter>
            </UserContext.Provider>
        )
        });

        expect(screen.getByTestId("Job-list-search-input")).toHaveValue("");
    })


});

describe("Handles form input correctly", () => {

    it('updates search input correctly', async () => {
        await act(async () => {render(
            <UserContext.Provider value={{user}}>
                <MemoryRouter>
                    <JobsList jobs={jobs} filterItems={mockFilterItems}/>
                </MemoryRouter>
            </UserContext.Provider>
        )
        });

      const searchInput = screen.getByTestId("Job-list-search-input");
      fireEvent.change(searchInput, {target: {value: "1"}});
      expect(searchInput).toHaveValue("1");

    })

    it("should handle form submission", async () => {
        // Mock the filterItems function from the parent component
        const mockFilterItems = jest.fn().mockResolvedValue({ jobs: []});   

        const jobs = [
          { title: "job1" },
          { title: "job2" },
          { title: "job3" },
        ];

        // Render the component
        await act(async () => {render(
          <UserContext.Provider value={{user}}>
              <MemoryRouter>
                  <JobsList jobs={jobs} filterItems={mockFilterItems}/>
              </MemoryRouter>
          </UserContext.Provider>
        )
        })
  
        // Get the search input and submit button
        const searchInput = screen.getByLabelText("Search");
        const submitButton = screen.getByRole("button", { name: "Search" });

        // Enter a search query
        fireEvent.change(searchInput, { target: { value: "test" } });

        // Submit the form
        await act(async () => {fireEvent.click(submitButton)});

        // Expect the filterItems function to be called with the correct filters
        expect(mockFilterItems).toHaveBeenCalledWith({ title: "test" });

    });

})