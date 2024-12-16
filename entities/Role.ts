import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Admin } from "./Admin";
import { Permission } from "./Permission";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @ManyToMany(() => Admin, (admin) => admin.roles)
  admins!: Admin[];

  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions!: Permission[];
}
