import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/categories.entity';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import * as data from "../src/utils/data.json"

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bienvenido a la app back del ecommerce de Javier Plata modulo 4 Cohorte FT53';
  }
}

export class DataLoaderService implements OnModuleInit {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    const categoriesCount = await this.categoryRepository.count();
    const productsCount = await this.productRepository.count();

   
    if (categoriesCount === 0 && productsCount === 0) {
      const insertPromises = data.map(async (element) => {
        return this.categoryRepository
          .createQueryBuilder()
          .insert()
          .into(Category)
          .values({ name: element.category })
          .orIgnore()
          .execute();
      });

      await Promise.all(insertPromises);
    }

    const categories = await this.categoryRepository.find();

    await Promise.all(data.map(async (element) => {
      const category = categories.find(
        (category) => category.name === element.category,
      );

      const existingProduct = await this.productRepository.findOne({ where: { name: element.name } });

      if (!existingProduct) { 
        const product = new Product();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.category = category;

        await this.productRepository
          .createQueryBuilder()
          .insert()
          .into(Product)
          .values(product)
          .execute();
      }
    }));

    return "Categorías y productos agregados";
  }
}