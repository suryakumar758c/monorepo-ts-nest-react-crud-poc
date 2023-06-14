import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@mrepo2/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async createProduct(product: Product) {
    try {
      await this.productRepository.insert(product);

      return { message: 'Product created!' };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Product name already exists!');
      }

      throw new BadRequestException(error?.message || error);
    }
  }

  findProducts() {
    return this.productRepository.find();
  }

  async updateProduct(product: Partial<Product>, id: number) {
    try {
      const result = await this.productRepository.update(
        { id },
        { ...product }
      );

      if (!result?.affected) {
        throw new BadRequestException(
          'Product not updated! Please check your inputs!'
        );
      }

      return { message: 'Product updated successfully!' };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Product name already exists!');
      }

      throw new BadRequestException(error?.message || error);
    }
  }

  async deleteProduct(id: number) {
    const result = await this.productRepository.delete({ id });

    if (!result?.affected) {
      throw new BadRequestException(
        'Product not removed! Please check your inputs!'
      );
    }

    return { message: 'Product removed successfully!' };
  }
}
