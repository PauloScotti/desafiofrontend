import { HttpApiServices } from "./HttpApiServices";

export class ProductServices extends HttpApiServices {
    baseUl = '/dados.json';

    async getProducts() {
        return await this.get(this.baseUl);
    }
}