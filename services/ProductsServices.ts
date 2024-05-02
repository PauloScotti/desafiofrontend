import { HttpApiServices } from "./HttpApiServices";

export class ProductServices extends HttpApiServices {
    baseUl = '';

    async getProducts() {
        return await this.get(this.baseUl);
    }
}