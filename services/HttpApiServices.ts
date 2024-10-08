import axios, { type AxiosInstance } from "axios";
// import { LoadingHelper } from "../components/helpers/LoadingHelper";

export class HttpApiServices {
    axios: AxiosInstance;
    countReq: any;

    constructor() {
        this.axios = axios.create({
            baseURL: 'http://localhost:3000'
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