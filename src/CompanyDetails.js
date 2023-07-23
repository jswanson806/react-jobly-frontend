import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api.js";
import JobCard from './JobCard.js';
import './styles/CompanyDetails.css';
import { UserContext } from "./helpers/UserContext.js";

/**
 * CompanyDetails Component
 *
 * Renders the details of a specific company, including its name and associated job cards.
 * Requires the `UserContext` to be provided by a parent component.
 * Retrieves the company information and jobs from the server using `JoblyApi` functions.
 * Uses the `useParams` hook from React Router to get the `handle` parameter from the URL.
 */


const CompanyDetails = () => {
    const {user} = useContext(UserContext);
    const [company, setCompany] = useState(null);
    const {handle} = useParams();

    useEffect(() => {
        async function getCompany() {
            let company = await JoblyApi.getCompany(handle);
            setCompany(company);
        }
        getCompany()
    }, [handle])

    let jobs = null;

    // true when getCompany() resolves and company.jobs has a value
    if(company && company.jobs){
        // map each job to a job card
        jobs = company.jobs.map(job => (
            <JobCard job={job} key={job.title} user={user}/>
        ))
    }
    

    return(
        <div className="Company-detail" data-testid="Company-detail">
            <div className="Company-detail-heading" data-testid="Company-detail-heading">
                <h4 className="Company-detail-title" data-testid="Company-detail-title">{company && company.handle}</h4>
            </div>
            <div className="Company-detail-cards" data-testid="Company-detail-cards">
                {jobs}
            </div>
        </div>
    );
};

export default CompanyDetails;