import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DoorsPartsService } from './doors-parts.service';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import {
    FindOneResponse,
    GetBestsellersResponse,
    GetByNameRequest,
    GetByNameResponse,
    GetNewResponse, PaginateAndFilterResponse, SearchRequest, SearchResponse
} from './types';

@Controller('doors-parts')
export class DoorsPartsController {
    constructor(private readonly doorsService: DoorsPartsService) { }



    @ApiOkResponse({ type: PaginateAndFilterResponse })
    @UseGuards(AuthenticatedGuard)
    @Get()
    paginateAndFilter(@Query() query) {
        return this.doorsService.paginatAndFilter(query);
    }


    @ApiOkResponse({ type: FindOneResponse })
    @UseGuards(AuthenticatedGuard)
    @Get('find/:id')
    getOne(@Param('id') id: string) {
        return this.doorsService.findOne(id);
    }

    @ApiOkResponse({ type: GetBestsellersResponse })
    @UseGuards(AuthenticatedGuard)
    @Get('bestsellers')
    getBestsellers() {
        return this.doorsService.bestseller();
    }

    @ApiOkResponse({ type: GetNewResponse })
    @UseGuards(AuthenticatedGuard)
    @Get('new')
    getNew() {
        return this.doorsService.newDoors();
    }

    @ApiOkResponse({ type: SearchResponse })
    @ApiBody({ type: SearchRequest })
    @UseGuards(AuthenticatedGuard)
    @Post('search')
    search(@Body() { search }: { search: string }) {
        return this.doorsService.searchByString(search);
    }

    @ApiOkResponse({ type: GetByNameResponse })
    @ApiBody({ type: GetByNameRequest })
    @UseGuards(AuthenticatedGuard)
    @Post('name')
    getByName(@Body() { name }: { name: string }) {
        return this.doorsService.searchByString(name);
    }
}
