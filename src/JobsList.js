import React, {useState, useEffect} from "react";
import JobCard from "./JobCard.js";
import './styles/JobList.css';

/**
 * JobsList Component
 *
 * Displays a list of jobs and provides a search functionality to filter jobs.
 *
 * Props:
 * - jobs: An array of job objects.
 * - filterItems: A function to filter jobs based on search filters.
 *
 * State:
 * - jobList: Tracks the state of the filtered jobs.
 * - jobCards: Tracks the state of the rendered JobCard components.
 * - formData: Tracks the state of the search form data.
 *
 * Hooks:
 * - useEffect: Maps the jobs in jobList to JobCard components when jobList or jobs prop changes.
 *
 * Functions:
 * - handleChange: Updates the formData state as the user types in the search input.
 * - handleSubmit: Submits the search form, calls the filterItems function, and updates the jobList state.
 */

const JobsList = ({jobs, filterItems}) => {

    // initial value of formData
    const INITIAL_STATE = {
        title: ""
    }

    // ********************* State *********************

    // track state of jobList -> default value is all jobs
    const [jobList, setJobList] = useState(jobs);
    // track state of jobCards
    const [jobCards, setJobCards] = useState([]);
    // tracks state of formData -> default is INITIAL_STATE variable
    const [formData, setFormData] = useState(INITIAL_STATE)

    // ********************* Hooks *********************


    // hook that maps the jobs in jobList to JobCard components
    useEffect(() => {
            // map jobs to JobCard and pass 'job' and 'user' as props
            setJobCards(jobList.map(job => ( 
              <div className="Job-list-cards" key={job.id}>
                <JobCard job={job} />
                </div>
            )));
        // watch for state of jobList or users to update before running again
    }, [jobs, jobList])

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
        // set the input as the value of 'title' in filters
        const filters = {
            title: formData.title
        }
        // function call to backend api to filter jobs based on search filters
        const res = await filterItems(filters);
        // update jobList state -> triggers useEffect hook to map new JobCard's
        setJobList(res.jobs);
    }

    return (
        <div className="Job-list" data-testid="Job-list">
            <div className="Job-list-title" data-testid="Job-list-title">
              <h1 className="Job-list-heading" data-testid="Job-list-heading">Jobs</h1>
            </div>
            <div className="Job-list-search" data-testid="Job-list-search">
              <form className="Job-list-search-form" data-testid="Job-list-search-form" onSubmit={handleSubmit}>
                <label htmlFor="jobSearch" className="Job-list-search-label">Search</label>
                <input type="text" 
                       id="jobSearch" 
                       name="title" 
                       data-testid="Job-list-search-input"
                       value={formData.title}
                       onChange={handleChange}
                       placeholder="Search Jobs"
                       className="Job-list-search-input"
                />
                <button type="submit" 
                        data-testid="Job-list-search-button"
                        className="Job-list-search-button"
                >
                  Search
                </button>
              </form>
            </div>
              {jobCards}
        </div>

    )
};

export default JobsList;