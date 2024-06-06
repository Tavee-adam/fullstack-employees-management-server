import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  sex: string;

  @Column({ type: 'date', nullable: false })
  birth: string;

  @Column({ type: 'text', nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  subDistrict: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  district: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  province: string;

  @Column({ type: 'date', nullable: false })
  idCardExp: string;
}
