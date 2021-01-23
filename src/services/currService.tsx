import { HttpClient, IHttpClientRequestParameters } from "./httpClient";

let httpClient = new HttpClient();
let baseUrl = 'https://jsonplaceholder.typicode.com/'
const currService = {
    fetchItems(): Promise<[]> {
        // prepare our request parameters
        const getParameters: IHttpClientRequestParameters<any> = {
            url: `${baseUrl}users`,
            requiresToken: false
        }

        // just return httpClient.get (which is a promise) or again use async/await if you prefer
        return httpClient.get<[]>(getParameters)
    }
}

export default currService;