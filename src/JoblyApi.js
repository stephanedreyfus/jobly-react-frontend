import axios from 'axios';

/** class with helper methods to centralize information for AJAX calls, can be called throughout app */
class JoblyApi {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
        paramsOrData._token = localStorage.getItem('token');

        console.debug("API Call:", endpoint, paramsOrData, verb);

        try {
            return (await axios({
                method: verb,
                url: `http://localhost:3001/${endpoint}`,
                [verb === "get" ? "params" : "data"]: paramsOrData
            })).data;
            // axios sends query string data via the "params" key,
            // and request body data via the "data" key,
            // so the key we need depends on the HTTP verb
        }

        catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    /** Ajax call to get one company. => 
     * { company: { handle, name, num_employees, description, logo_url,
     *              jobs: [{ id, title, salary, equity }, ...]
     * }}
    */
    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    /** Ajax call to get all companies. =>
     * { companies: [{ handle, name, description, logo_url }, ...} ]}
    */
    static async getAllCompanies(params) {
        let res = await this.request('companies/', params);
        return res.companies;
    }

    /** Ajax call to get all companies. =>
     * { jobs: [{ id, title, company_handle, salary, equity, state: null/applied }, ...} ]}
    */
    static async getAllJobs(params) {
        let res = await this.request('jobs/', params);
        return res.jobs;
    }

    /** Ajax call to get a token =>
     * { token : (JWT String) }
     */
    static async login(data) {
        let res = await this.request('login/', data, 'post');
        return res;
    }

    /** Ajax call to register new user, get a token =>
     * { token : (JWT String) }
     */
    static async register(data) {
        let res = await this.request('users/', data, 'post');
        return res;
    }
}

export default JoblyApi;