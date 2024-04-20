import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Machine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    vendor: string;

    @Column()
    status: string;

    @Column()
    description: string;

    constructor(mach: Partial<Machine>) {
        Object.assign(this, mach);
    }
}
