import { Column } from 'typeorm';

export class Address {
  @Column({default: ''})
  province: string;

  @Column({default: ''})
  district: string;

  @Column({default: ''})
  commune: string;

  @Column({default: ''})
  street: string;
}
