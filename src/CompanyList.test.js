import React from 'react';
import { MemoryRouter} from 'react-router-dom';
import { act, render, waitFor, screen, fireEvent} from '@testing-library/react';
import CompanyList from './CompanyList.js';
import '@testing-library/jest-dom';


const companies = [
    {
      handle: "test-company-1",
      name: "Test Company 1",
      num_employees: 9999,
      description: "Test description for Test Company 1",
    },
    {
      handle: "test-company-2",
      name: "Test Company 2",
      num_employees: 99999,
      description: "Test description for Test Company 2",
    }
];



describe('CompanyList smoke and snapshot', () => {

    it('should render without crashing', async () => {
        await act(async () => {render(

                <MemoryRouter>
                    <CompanyList companies={companies} />
                </MemoryRouter>

            );
        });
    });

    it('should match the snapshot', async () => {
        let asFragment

        await act(async () => {const {asFragment: fragment} = render(

                <MemoryRouter>
                    <CompanyList companies={companies} />
                </MemoryRouter>

            );
            asFragment = fragment;
        });
        expect(asFragment()).toMatchSnapshot();
    });

});

describe("Renders correct content",() => {

    it('should render company cards', async () => {
        await act(async () => {render(

                <MemoryRouter>
                    <CompanyList companies={companies} />
                </MemoryRouter>

            ); 
        });

        // wait for the content to finish rendering
        await waitFor(() => {
            expect(screen.getAllByTestId("Company-description").length).toBeGreaterThan(0);
        })
        // rendered 2 company cards because companies contains only 2 companies
        expect(screen.getAllByTestId("Company-description").length).toBe(2)
    })


    it('should render text field with empty string value', async () => {
        await act(async () => {render(

                <MemoryRouter>
                    <CompanyList companies={companies} />
                </MemoryRouter>

            ); 
        });

        expect(screen.getByTestId("Company-list-search-input")).toHaveValue("");
    })

})

describe("Handles form input correctly", () => {


    it('updates search input correctly', async () => {
        await act(async () => {render(

                <MemoryRouter>
                    <CompanyList companies={companies} />
                </MemoryRouter>

            ); 
        });


      const searchInput = screen.getByTestId("Company-list-search-input");
      fireEvent.change(searchInput, {target: {value: "1"}});
      expect(searchInput).toHaveValue("1");

    })

})


describe("CompanyList", () => {
    it("should handle form submission", async () => {
      // Mock the filterItems function from the parent component
      const mockFilterItems = jest.fn().mockResolvedValue({ companies: []});

      const mockCompanies = [
        { handle: "company1" },
        { handle: "company2" },
        { handle: "company3" },
      ];
  
      // Render the component
      await act(async () => {render(
        <MemoryRouter>
            <CompanyList companies={mockCompanies} filterItems={mockFilterItems} />
        </MemoryRouter>
      );

      })
  
        // Get the search input and submit button
        const searchInput = screen.getByLabelText("Search");
        const submitButton = screen.getByRole("button", { name: "Search" });

        // Enter a search query
        fireEvent.change(searchInput, { target: { value: "test" } });

        await act(async () => {
            // Submit the form
            fireEvent.click(submitButton);
        })
        

        // Expect the filterItems function to be called with the correct filters
        expect(mockFilterItems).toHaveBeenCalledWith({ name: "test" });

    });

  });