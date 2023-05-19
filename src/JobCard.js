import React, { useEffect, useState, useContext } from "react";
import JoblyApi from "./api.js";
import './JobCard.css';
import { UserContext } from "./helpers/UserContext.js";

/**
 * JobCard Component
 *
 * Renders a card displaying job details and an "Apply" button. Tracks the application status for the job.
 * Requires the `UserContext` to be provided by a parent component.
 *
 * Props:
 * - job: Object representing the job details
 */


const JobCard = ({job}) => {
    const {user} = useContext(UserContext);
    // ********************* State *********************

    // state tracking status of each job application. Sets default value when 'user' is valid by checking for job.id in user.applications array
    const [isApplied, setIsApplied] = useState(user && user.applications.includes(job.id));

    
    // ********************* Functions *********************

    // function calls api to apply to job and updates isApplied state
    const submitApplication = async (username, jobId) => {
        const res = await JoblyApi.applyToJob(username, jobId);
        // if response contains key 'applied', set isApplied state to true
        if(res.applied){
            setIsApplied(true);
        };
    };


    return(
        <div className="Job-card" data-testid={`Job-card-${job.id}`}>
            <div className="Job-heading">
                  <h4 className="Job-title" data-testid="Job-title">{job.title}</h4>
            </div>
                  <li className="Job-salary" data-testid="Job-salary">Salary: {job.salary}</li>
                  <li className="Job-equity" data-testid="Job-equity">Equity: {job.equity}</li>
                  {/* conditionally render active or deactivated 'Apply' button based on whether or not the id for a job exists in the user.applications array */}
                {isApplied ? <button className="Job-apply-button Job-apply-button--deactivated" data-testid="Job-apply-button-deactive" disabled>Apply</button>
                :
                <button className="Job-apply-button" data-testid="Job-apply-button-active" onClick={() => {submitApplication(user.username, job.id)}}>Apply</button>}

        </div>

    )
}

export default JobCard;