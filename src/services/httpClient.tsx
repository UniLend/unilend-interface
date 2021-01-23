import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

export interface IHttpClientRequestParameters<T> {
    url: string
    requiresToken: boolean
    payload?: T
}
export interface IHttpClient {
    get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
    post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T>
}

export class HttpClient implements IHttpClient {
    // ... implementation code will go here
    get<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, requiresToken } = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                // const token = this.getToken()
                // options.headers.RequestVerificationToken = token
            }

            axios
                .get(url, options)
                .then((response: AxiosResponse) => {
                    resolve(response.data as T)
                })
                .catch((response: AxiosError) => {
                    reject(response)
                })

        })
    }

    post<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, payload, requiresToken } = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                // const token = this.getToken()
                // options.headers.RequestVerificationToken = token
            }


            axios
                .post(url, payload, options)
                .then((response: AxiosResponse) => {
                    resolve(response.data as T)
                })
                .catch((response: AxiosError) => {
                    reject(response)
                })
        })
    }

    delete<T>(parameters: IHttpClientRequestParameters<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, requiresToken } = parameters

            const options: AxiosRequestConfig = {
                headers: {}
            }

            // if API endpoint requires a token, we'll need to add a way to add this.
            if (requiresToken) {
                // const token = this.getToken()
                // options.headers.RequestVerificationToken = token
            }
            axios
                .delete(url, options)
                .then((response: AxiosResponse) => {
                    resolve(response.data as T)
                })
                .catch((response: AxiosError) => {
                    reject(response)
                })
        })
    }
}

export const httpClient = new HttpClient()