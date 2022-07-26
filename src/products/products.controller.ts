import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()   
    addProduct(
        @Body("title") productTitle: string, 
        @Body("description") productDescription: string, @Body("price") productPrice: number
        ): any {
        const generatedId = this.productsService.insertProduct(productTitle, productDescription, productPrice);
        return {id: generatedId};
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(":id")
    getProduct(@Param("id") productId: string){
        return this.productsService.getSingleProduct(productId);
    }
    
    @Patch(":id")
    updateProduct(
        @Param("id") productId: string, 
        @Body("title") productTitle: string, 
        @Body("description") productDescription: string, @Body("price") productPrice: number
        ) {
            this.productsService.updateProduct(productId, productTitle, productDescription, productPrice);
            return null;      
    }

    @Delete(":id")
    removeProduct(@Param("id") productId: string) {
        this.productsService.deleteProduct(productId);
        return null;
    }
}