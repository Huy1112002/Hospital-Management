import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './entities/machine.entity';
import { EntityManager, Repository } from 'typeorm';
import { State } from '../common/enums/machine.enum';
import { Tag } from '../tag/entities/tag.entity';

@Injectable()
export class MachinesService {
  constructor(
    @InjectRepository( Machine )
    private readonly machineRepo : Repository<Machine>,
    @InjectRepository( Tag )
    private readonly tagRepo : Repository<Tag>,
    private readonly entityManager : EntityManager,
  ) {}

  async create(createMachinedto: CreateMachineDto) {
    // Extract tag contents from machineDto
    let tags: Tag[] = []
    if( createMachinedto.tags ) {
      const tagsPromise = createMachinedto.tags.map( async tagDto => {
          let tag = await this.tagRepo.findOne({ where: { content: tagDto.content }, relations: { machines: true } });
          if (!tag) {
            throw new NotFoundException('Tag not found')
          }
          return tag;
      });

      // Find or create tags
      tags = await Promise.all(tagsPromise)
    }

    // Create item
    const mach = new Machine({
      ...createMachinedto,
      tags
    })
    await this.entityManager.save(mach);

    return 'Machine added';
  }

  async findAll() {
    return await this.machineRepo.find({ relations: { tags: true }, loadEagerRelations: false })
  }

  async findOne(id: number) {
    const mach = await this.machineRepo.findOne( {
      where: { id: id },
      relations: { tags: true },
      loadEagerRelations: false
    } )

    return mach ? mach : { message: `Machine ${id} not found` }
  }

  async findbyState( state: State ) {
    const arr =  await this.machineRepo.findBy({
      status: state
    })
    
    if( arr.length == 0 ) return { message: `No ${state} machines` }
    
    return arr
  }

  async findbyTags( content: string ) {
    const tag = await this.tagRepo.findOne({
      where: { content: content },
      relations: { machines: true },
    })

    if( !tag ) return { message: 'tag doesnt exist' }

    const machines = tag.machines
    if( !machines || machines.length === 0 ) return { message: 'No machine with this tag' }

    return machines
  }

  async update(id: number, updateMachineDto: UpdateMachineDto) {
    const mach = await this.machineRepo.findOneBy( { id } )

    if( !mach ) return { message: `Machine ${id} not found` }

    if( updateMachineDto.tags ) {
      const tagsPromise = updateMachineDto.tags.map( async tagDto => {
        let tag = await this.tagRepo.findOne({ where: { content: tagDto.content }, relations: { machines: true } });
        if (!tag) {
          throw new NotFoundException('Tag not found')
        }
        return tag;
      });

      // Find or create tags
      const tags = await Promise.all(tagsPromise)
      mach.tags = tags
    }
    if( updateMachineDto.name ) mach.name = updateMachineDto.name
    if( updateMachineDto.vendor ) mach.vendor = updateMachineDto.vendor
    if( updateMachineDto.description ) mach.description = updateMachineDto.description
    if( updateMachineDto.status ) mach.status = updateMachineDto.status

    await this.entityManager.save( mach )

    return { message: `Machine ${id} updated` }
  }

  async remove(id: number) {
    const mach = await this.machineRepo.findOne({
      where: { id: id },
      relations: { tags: true }
    })

    if( !mach ) return { message: `Machine ${id} not found` }


    await this.machineRepo.delete({ id })
    return { message: `Machine ${id} removed` }
  }
}
