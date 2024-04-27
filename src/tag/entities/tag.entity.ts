import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Machine } from "../../machines/entities/machine.entity";
import { machine } from "os";



@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    content: string

    @ManyToMany(() => Machine, (machine) => machine.tags, { nullable: true, eager: true })
    machines: Machine[]
    

    constructor( tag: Partial<Tag> ) {
        Object.assign( this, tag )
    }
}
