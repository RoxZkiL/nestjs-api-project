import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
   private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const productId = Math.random().toString();
        const newProduct = new Product(productId, title, description, price)
        this.products.push(newProduct);
        return productId;
    }

    getProducts() {
        return [...this.products];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return {...product};
    }

    updateProduct(productId: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(productId);
        const updatedProduct = {...product};
        if(title && description && price) {
            updatedProduct.title = title;
            updatedProduct.description = description;
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id);
        const product = this.products[productIndex];
        if(!product) {
            throw new NotFoundException("Product does not exist");
        }
        return [product, productIndex];
    }

    deleteProduct(productId: string) {
        const index = this.findProduct(productId)[1];
        this.products.splice(index, 1);
    }
}