import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { State } from '../../common/enums/machine.enum';

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

    constructor(mach: Partial<Machine>) {
        Object.assign(this, mach);
    }
}
