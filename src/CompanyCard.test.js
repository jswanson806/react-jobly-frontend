import React from 'react';
import { act, screen, render, getByTestId} from '@testing-library/react';
import CompanyCard from './CompanyCard.js';
import '@testing-library/jest-dom';


const company = {
    handle: "test-company-1",
    name: "Test Company 1",
    num_employees: 9999,
    description: "Test description for Test Company 1",
}

describe('CompanyCard smoke and snapshot', () => {

    it('should render without crashing', async () => {
        await act(async () => {render(
            <CompanyCard company={company} />);
        });
    });

    it('should match the snapshot', async () => {
        let asFragment;
        await act(async () => {const {asFragment: fragment} = render(
            <CompanyCard company={company} />
            );
            asFragment = fragment;
        });
        
        expect(asFragment()).toMatchSnapshot();
    });

});

describe('Rendering with correct data', () => {

    it('should contain correct data from prop', async () => {
        await act(async () => {render(
            <CompanyCard company={company} />);
        });
        
        const title = screen.getByTestId("Company-title");
        const description = screen.getByTestId("Company-description");
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent("Test Company 1");
        expect(description).toBeInTheDocument();
        expect(description).toHaveTextContent("Test description for Test Company 1");

    });

});
