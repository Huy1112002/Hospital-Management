import { Injectable, NotFoundException } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { Machine } from '../machines/entities/machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';
import { UpdateTagDto } from './dto/updatetag.dto';

@Injectable()
export class TagService {
  constructor( 
    @InjectRepository(Tag)
    private readonly tagRepo : Repository<Tag>,
    @InjectRepository(Machine)
    private readonly machineRepo : Repository<Machine>,
){}

async find() {
    const arr = await this.tagRepo.find({ relations: { machines: true }})
    if( arr.length == 0 ) return { message: 'No tags right now'}
    return arr
}


async add( dto : TagDto ) {
    const tag = await this.tagRepo.findOne({
        where: { content: dto.content }
    })

    if( tag ) return { message: 'Duplicate tag'}
    
    const Ntag = new Tag({
        ...dto,
        machines: []
    })

    await this.tagRepo.save(Ntag)
    
    return 'Added new tag'
}

async patch( dto: UpdateTagDto ) {
    const tag = await this.tagRepo.findOne({
        where: { content: dto.og }, relations: ['machines.tags']
    })

    if( !tag ) throw new NotFoundException('tag not found')
    
    const machines = tag.machines

    tag.content = dto.content

    for( const mach of machines ) {
        mach.tags = mach.tags.map( (t) => {
            if( t.content === dto.content ) return tag
            else return t
        })
        await this.machineRepo.save(mach)
    }

    tag.machines = machines
    await this.tagRepo.save(tag)

    return { message: 'Tag updated'}
}

async remove( content: string ) {
    const tag = await this.tagRepo.findOne({
        where: { content: content }, relations: ['machines.tags']
    })
    
    if( !tag ) throw new NotFoundException('tag not found')

    const machines = tag.machines

    for( const mach of machines ) {
        mach.tags = mach.tags.filter(tag => tag.content !== content )
        await this.machineRepo.save(mach)
    }
    

    await this.tagRepo.delete({ id: tag.id })

    return { message: 'Deleted tag'}
}
}
