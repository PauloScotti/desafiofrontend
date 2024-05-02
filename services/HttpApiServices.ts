import axios, { type AxiosInstance } from "axios";
// import { LoadingHelper } from "../components/helpers/LoadingHelper";

export class HttpApiServices {
    axios: AxiosInstance;
    countReq: any;

    constructor() {
        this.axios = axios.create({
            baseURL: 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=50&sortBy=id&orderBy=ASC'
        });

        this.countReq = 0;

        this.axios.interceptors.request.use((config: any) => {
            this.countReq++;
            // if (this.countReq === 1) {
            //     LoadingHelper.displayOn();
            // }

            return config;
        });

        this.axios.interceptors.response.use((response) => {
            this.countReq--;
            // if (this.countReq === 0) {
            //     LoadingHelper.displayOff();
            // }

            return response;
        });
    }

    get(url: string) {
        return this.axios.get(url);
    }
}