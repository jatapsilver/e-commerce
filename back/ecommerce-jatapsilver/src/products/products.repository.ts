import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/categories.entity";
import { Product } from "src/entities/products.entity";
import { Repository } from "typeorm";
import * as data from "../utils/data.json"

@Injectable()
export class ProductRepository {

      constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
      ){}
      
      async getProducts(page: number, limit: number): Promise<Partial<Product>[]> {
        let products = await this.productsRepository.find({
          relations: {
            category: true,
          },
        });
        
        const start = (page - 1) * limit;
        const end = start + limit;
        products = products.slice(start, end);
        return products;
      }

      async getProduct(id:string){
        const product = await this.productsRepository.findOneBy({id});
        if(!product) return `Producto con id ${id} no encontrado`;
          return product;
      }

      async addProducts() {
        const categories = await this.categoriesRepository.find();
        const existingProductNames: string[] = []; 
    
        for (const element of data) {
            const category = categories.find(
                (category) => category.name === element.category,
            );
            
            const existingProduct = await this.productsRepository.findOne({ where: { name: element.name } });
    
            if (existingProduct) {
                existingProductNames.push(existingProduct.name);
                continue;
            }
    
            const product = new Product();
            product.name = element.name;
            product.description = element.description;
            product.price = element.price;
            product.imgUrl = element.imgUrl;
            product.stock = element.stock;
            product.category = category;
    
            await this.productsRepository
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values(product)
                .orUpdate(["description", "price", "imgUrl", "stock"], ["name"]) 
                .execute();
        }
    
        if (existingProductNames.length > 0) {
            return `Los siguientes productos ya existen: ${existingProductNames.join(', ')}`;
        }
    
        return "Productos agregados exitosamente";
    }
    

      async updateProduct(id:string, product: Product){
        await this.productsRepository.update(id, product);
        const updatedProduct = await this.productsRepository.findOneBy({id});
        return updatedProduct
      }
    
}



