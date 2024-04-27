import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../../common/enums/machine.enum';
import { Tag } from '../../tag/entities/tag.entity';

@Entity()
export class Machine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    vendor: string;

    @Column()
    status: State;

    @Column()
    description: string = '';

    @ManyToMany(() => Tag, (tag) => tag.machines, { cascade: true } )
    @JoinTable()
    tags: Tag[]

    constructor(mach: Partial<Machine>) {
        Object.assign(this, mach);
    }
}
