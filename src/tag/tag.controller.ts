import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from '../common/decorators/auth.decorator';
import { UpdateTagDto } from './dto/updatetag.dto';

@Controller('tag')
export class TagController {
    constructor( private readonly tagservice : TagService ) {}
    @ApiBearerAuth()
    @Public()
    @Get()
    async find() {
        return await this.tagservice.find()
    }


    @ApiBearerAuth()
    @Public()
    @Post()
    async add( @Body() dto : TagDto ) {
        return await this.tagservice.add(dto)
    }

    @ApiBearerAuth()
    @Public()
    @Patch()
    async patch( @Body() dto: UpdateTagDto ) {
        return await this.tagservice.patch( dto )
    }

    @ApiBearerAuth()
    @Public()
    @Delete(':content')
    async remove( @Param('content') content: string ) {
        return await this.tagservice.remove( content )
    }
}