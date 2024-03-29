import { Column } from 'typeorm';

export class Cost {
  @Column({default: 0})
  deposit: number;

  @Column({default: 0})
  room_cost: number;

  @Column({default: 0})
  water_cost: number;

  @Column({default: 0})
  power_cost: number;

  @Column({default: 0})
  cost_per_person: number;

  @Column({default: 0})
  cost_per_room: number;
}
