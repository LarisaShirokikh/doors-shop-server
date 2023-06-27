import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCart } from './shop-cart.model';
import { UsersService } from 'src/users/users.service';
import { DoorsPartsService } from 'src/doors-parts/doors-parts.service';
import { AddToCardDto } from './dto/add-to-cart.dto';

@Injectable()
export class ShoppingCartService {
    constructor(
        @InjectModel(ShoppingCart)
        private shoppingCartModel: typeof ShoppingCart,
        private readonly usersService: UsersService,
        private readonly doorsService: DoorsPartsService,

    ) { }

    async findAll(userId: string): Promise<ShoppingCart[]> {
        return this.shoppingCartModel.findAll({ where: { userId } })
    }

    async add(addToCardDto: AddToCardDto) {
        const cart = new ShoppingCart()
        const user = await this.usersService.findOne({ where: { username: addToCardDto.username } })
        const door = await this.doorsService.findOne(addToCardDto.doorsId);

        cart.userId = user.id
        cart.doorsId = door.id
        cart.doors_manufacturer = door.doors_manufacturer
        cart.price = door.price
        cart.in_stock = door.in_stock;
        cart.image = JSON.parse(door.images)[0]
        cart.name = door.name;
        cart.total_price = door.price;

        return cart.save();
    }

    
    async updateCount(count: number, doorsId: string): Promise<{ count: number }> {
        await this.shoppingCartModel.update({ count }, { where: { doorsId } })
        const door = await this.shoppingCartModel.findOne({ where: { doorsId } })
        return { count: door.count };
    }

    async updateTotalPrice(total_price: number, doorsId: string): Promise<{ total_price: number }> {
        await this.shoppingCartModel.update({ total_price }, { where: { doorsId } })
        const door = await this.shoppingCartModel.findOne({ where: { doorsId } })
        return { total_price: door.total_price };
    }

    async remove(doorsId: string): Promise<void> {
        const door = await this.shoppingCartModel.findOne({ where: { doorsId } })
        await door.destroy()
    }
    

    async removeAll(userId: string): Promise<void> {
        await this.shoppingCartModel.destroy({ where: { userId } })

    }
}
