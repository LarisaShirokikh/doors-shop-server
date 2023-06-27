import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";

class DoorsParts {
    @ApiProperty({ example: '1' })
    id: string;

    @ApiProperty({ example: faker.lorem.sentence(2) })
    doors_manufacturer: string;

    @ApiProperty({ example: 12345 })
    price: string;

    @ApiProperty({ example: faker.internet.password })
    vendor_code: string;

    @ApiProperty({ example: faker.lorem.word })
    name: string;

    @ApiProperty({ example: faker.lorem.sentence() })
    configuration: string;

    @ApiProperty({ example: faker.lorem.sentence() })
    description: string;

    @ApiProperty({ example: faker.image.city() })
    images: string;

    @ApiProperty({ example: 5 })
    in_stock: number;

    @ApiProperty({ example: true })
    bestseller: boolean;

    @ApiProperty({ example: false })
    new: boolean;

    @ApiProperty({ example: 123 })
    popularity: number;

    @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
    createdAt: string;

    @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
    updatedAt: string;
}
export class PaginateAndFilterResponse {
    @ApiProperty({ example: "20" })
    count: number;

    @ApiProperty({ type: DoorsParts, isArray: true })
    rows: DoorsParts;
}
export class Bestsellers extends DoorsParts {
    @ApiProperty({ example: true })
    bestseller: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
    @ApiProperty({ example: 10 })
    count: number;

    @ApiProperty({ type: DoorsParts, isArray: true })
    rows: Bestsellers;
}

export class NewParts extends DoorsParts {
    @ApiProperty({ example: true })
    new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
    @ApiProperty({ example: 10 })
    count: number;

    @ApiProperty({ type: DoorsParts, isArray: true })
    rows: NewParts;
}
export class SearchByLetterResponse extends DoorsParts {
    @ApiProperty({ example: 'Provident incidunt.' })
    name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {

    @ApiProperty({ type: SearchByLetterResponse, isArray: true })
    rows: SearchByLetterResponse;
}

export class SearchRequest {
    @ApiProperty({ example: 'r' })
    search: string;
}

export class GetByNameResponse extends PaginateAndFilterResponse {
    @ApiProperty({ example: "Laboriosam quibusdam" })
    name: string;
}
export class GetByNameRequest {
    @ApiProperty({ example: "Laboriosam quibusdam" })
    name: string;
}
export class FindOneResponse extends PaginateAndFilterResponse { }







export interface IDoorsPartsQuery {
    limit: string;
    offset: string;
}