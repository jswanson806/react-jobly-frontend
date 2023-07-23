import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard.js";
import { Link } from "react-router-dom";
import './styles/CompanyList.css';

/**
 * CompanyList Component
 *
 * Displays a list of companies and provides a search functionality to filter companies.
 *
 * Props:
 * - companies: An array of company objects.
 * - filterItems: A function to filter companies based on search filters.
 *
 * State:
 * - companiesList: Tracks the state of the filtered companies.
 * - companyCards: Tracks the state of the rendered CompanyCard components.
 * - formData: Tracks the state of the search form data.
 *
 * Hooks:
 * - useEffect: Maps the companies in companiesList to CompanyCard components when companiesList or companies prop changes.
 *
 * Functions:
 * - handleChange: Updates the formData state as the user types in the search input.
 * - handleSubmit: Submits the search form, calls the filterItems function, and updates the companiesList state.
 */

const CompanyList = ({companies, filterItems}) => {
    // initial value of formData
    const INITIAL_STATE = {
        name: ""
    }

    // ********************* State *********************

    // track state of companiesList -> default value is all companies
    const [companiesList, setCompaniesList] = useState(companies);
    // track state of companyCards
    const [companyCards, setCompanyCards] = useState([]);
    const [formData, setFormData] = useState(INITIAL_STATE)

    // ********************* Hooks *********************

    // hook that maps the companies in companiesList to CompanyCard components
    useEffect(() => {
        setCompanyCards(companiesList.map(company => (
            <div className="Company-list-cards" key={company.handle}>
                <Link to={`/companies/${company.handle}`} data-testid={`company-link-${company.handle}`}>
                    <CompanyCard company={company}/>
                </Link>
            </div>
        )));
        // watch for state of companiesList to update before running again
    }, [companiesList])

    // ********************* Functions *********************

    // update the form data as the user types in the input
    const handleChange = (e) => {
        const { name, value } = e.target;
        // update formData state with input field name and value of input field
        setFormData(formData => ({
          ...formData,
          [name]: value,
        }));
      }

    // submit the form data 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // set the input as the value of 'name' in filters
        const filters = {
            name: formData.name
        }
        // pass filters object to function call 'filterCompanies' from parent component 'Routes.js'
        const res = await filterItems(filters);
        // update companiesList state -> triggers useEffect hook to map new companyCards
        setCompaniesList(res.companies)
        // reset search input
        setFormData(INITIAL_STATE);
    }

    return (
        <div className="Company-list" data-testid="Company-list">
            <div className="Company-list-title" data-testid="Company-list-title">
                <h1 className="Company-list-heading" data-testid="Company-list-heading">Companies</h1>
            </div>
            <div data-testid="Company-list-search">
                <form className="Company-list-search-form" onSubmit={handleSubmit} data-testid="Company-list-search-form">
                    <label htmlFor="compSearch" className="Company-list-search-label">Search</label>
                    <input type="text" 
                            id="compSearch" 
                            name="name" 
                            data-testid="Company-list-search-input"
                            value={formData.name}
                            onChange={handleChange}
                            className="Company-list-search-input"
                    />
                    <button type="submit" 
                            data-testid="Company-list-search-button"
                            className="Company-list-search-button"
                    >
                        Search
                    </button>
                </form>
            </div>
            {companyCards}
        </div>
    );
};

export default CompanyList;