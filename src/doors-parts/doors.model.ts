
import { DataTypes } from "sequelize";
import { Model, Column, Table } from "sequelize-typescript";

@Table
export class Doors extends Model {

    @Column
    doors_manufacturer: string;

    @Column({ defaultValue: 0 })
    price: number;

    @Column
    vendor_code: string;

    @Column
    name: string;

    @Column
    configuration: string;

    @Column
    description: string;

    @Column({ type: DataTypes.STRING(1000) })
    images: string;

    @Column({ defaultValue: 0 })
    in_stock: number;

    @Column({ defaultValue: false })
    bestsellers: boolean;

    @Column({ defaultValue: false })
    new: boolean;

    @Column
    popularity: number;
}
