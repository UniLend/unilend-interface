import axios from 'axios';


const getClientAxios = () => {
    //const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const options = {
        baseURL: 'https://jsonplaceholder.typicode.com/',
        headers: {
            Accept: 'application/json',
        }
    };
    /*    if (currentUser) {
            options.headers.Authorization = 'Bearer ' + currentUser.token;
            options.headers.role = '' + currentUser.role === '0' ? 'admin' : 'editor';
        }
    */
    const clientAxios = axios.create(options);
    return clientAxios;
};

let client = getClientAxios()

export const httpClient = {

    get: (url: any, conf = {}) => {
        return client.get(url, conf)
            .then((response: any) => Promise.resolve(response.data))
            .catch((error: any) => Promise.reject(error));
    },

    delete: (url: any, conf = {}) => {
        return client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error));
    },

    head: (url: any, conf = {}) => {
        return client.head(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    },

    options: (url: any, conf = {}) => {
        return client.options(url, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    },

    post: (url: any, data = {}, conf = {}) => {
        return client.post(url, data, conf)
            .then((response: any) => Promise.resolve(response.data))
            .catch((error: any) => Promise.reject(error));
    },

    put: (url: any, data = {}, conf = {}) => {
        return client.put(url, data, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    },

    patch: (url: any, data = {}, conf = {}) => {
        return client.patch(url, data, conf)
            .then((response: any) => Promise.resolve(response))
            .catch((error: any) => Promise.reject(error));
    }

}