import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { Tag } from './entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Machine } from '../machines/entities/machine.entity';

 
@Module({
  imports: [ TypeOrmModule.forFeature([Tag, Machine])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
