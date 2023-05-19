import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

 static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    } catch (error) {
      console.log('Error in getCompany:', error);
      throw error;
    }
  }

  /** Filter list of companies based on filters. */
  static async getCompanies(filters) {
    try {
      let res = await this.request(`companies`, filters);
      return res;
    } catch (error) {
      console.log('Error in getCompanies:', error);
      throw error;
    }
  }

  /** Filter list of jobs based on filters. */
  static async getJobs(filters) {
    try {
      let res = await this.request(`jobs`, filters);
      return res;
    } catch (error) {
      console.log('Error in getJobs:', error);
      throw error;
    }
  }

  /** Post user info to registration endpoint. */
  static async registerUser(userInfo) {
    try {
      let res = await this.request(`auth/register`, userInfo, "post");
      return res.token;
    } catch (error) {
      console.log('Error in registerUser:', error);
      throw error;
    }
  }

  /** Authorize and log in user. */
  static async logInUser(username, password) {
    try {
      let res = await this.request(`auth/token`, {
        username: username,
        password: password
      }, "post");
      return res.token;
    } catch (error) {
      console.log('Error in logInUser:', error);
      throw error;
    }
  }

  /** Patch user information. */  
  static async patchUser(user) {
    try {
      const { username, ...data } = user;
      let res = await this.request(`users/${username}`, data, "patch");
      return res;
    } catch (error) {
      console.log('Error in patchUser:', error);
      throw error;
    }
  }

  /** Get user details by username. */
  static async getUser(username) {
    try {
      let res = await this.request(`users/${username}`);
      return res;
    } catch (error) {
      console.log('Error in getUser:', error);
      throw error;
    }
  }

  /** Post job to user applications array. */
  static async applyToJob(username, jobId) {
    try {
      let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
      return res;
    } catch (error) {
      console.log('Error in applyToJob:', error);
      throw error;
    }
  }
  
}


export default JoblyApi;