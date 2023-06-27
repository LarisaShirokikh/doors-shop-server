import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { DoorsPartsModule } from 'src/doors-parts/doors-parts.module';
import { ShoppingCart } from './shop-cart.model';

@Module({
  imports: [SequelizeModule.forFeature([ShoppingCart]), UsersModule, DoorsPartsModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule { }
