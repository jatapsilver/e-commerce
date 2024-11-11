import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductRepository){}
   
    async getProducts(page: number, limit: number): Promise<Partial<Product>[]> {
        return await this.productsRepository.getProducts(page, limit);
    }

    getProduct(id:string){
        return this.productsRepository.getProduct(id);
    }

    
    addProducts(){
        return this.productsRepository.addProducts();
    }

    updateProduct(id: string, product:any){
        return this.productsRepository.updateProduct(id, product);
    }

    // deleteProduct(id: string){
    //     return this.productsRepository.deleteProduct(id);
    // }
}
