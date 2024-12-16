import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string; // Change username to email

  @Column()
  passwordHash!: string;

  @ManyToMany(() => Role, (role) => role.admins)
  @JoinTable()
  roles!: Role[];
}
