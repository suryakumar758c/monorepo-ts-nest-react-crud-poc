import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Product } from '@mrepo2/product';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  createProduct(@Body() product: Product) {
    return this.productService.createProduct(product);
  }

  @Get('/list')
  findProducts() {
    return this.productService.findProducts();
  }

  @Put('/update')
  updateProduct(@Body() product: Product) {
    const { id, ...data } = product;

    return this.productService.updateProduct(data, id);
  }

  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}
