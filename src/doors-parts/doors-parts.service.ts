import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doors } from './doors.model';
import { IDoorsPartsQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class DoorsPartsService {
    constructor(
        @InjectModel(Doors)
        private doorsModel: typeof Doors
    ) { }

    async paginatAndFilter(query: IDoorsPartsQuery): Promise<{ count: number; rows: Doors[] }> {
        const limit = +query.limit;
        const offset = +query.offset * 20;
        return this.doorsModel.findAndCountAll({ limit, offset })
    }

    async bestseller(): Promise<{ count: number; rows: Doors[] }> {
        return this.doorsModel.findAndCountAll({ where: { bestsellers: true } })
    }

    async newDoors(): Promise<{ count: number; rows: Doors[] }> {
        return this.doorsModel.findAndCountAll({ where: { new: true } })
    }

    async findOne(id: string): Promise<Doors> {
        return this.doorsModel.findOne({ where: { id } })
    }

    async findOneByName(name: string): Promise<Doors> {
        return this.doorsModel.findOne({ where: { name } })
    }

    async searchByString(str: string
    ): Promise<{ count: number; rows: Doors[] }> {
        return this.doorsModel.findAndCountAll({
            limit: 20,
            where: { name: { [Op.like]: `%${str}%` } },
        });
    }
}

