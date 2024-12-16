import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id!: number; // Use `!` to skip strict property checks.

  @Column()
  name: string = ""; // Initialize with a default value.

  @Column()
  email: string = "";

  @Column()
  phone: string = "";

  @Column()
  leaseStartDate: Date = new Date();

  @Column()
  leaseEndDate: Date = new Date();
}
