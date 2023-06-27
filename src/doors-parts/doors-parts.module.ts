import { Module } from '@nestjs/common';
import { DoorsPartsController } from './doors-parts.controller';
import { DoorsPartsService } from './doors-parts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doors } from './doors.model';

@Module({
  imports: [SequelizeModule.forFeature([Doors])],
  controllers: [DoorsPartsController],
  providers: [DoorsPartsService],
  exports: [DoorsPartsService],
})
export class DoorsPartsModule {}
