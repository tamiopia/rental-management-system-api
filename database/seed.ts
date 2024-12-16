import { AppDataSource } from "./dataSource";
import { Admin } from "../entities/Admin";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";
import bcrypt from "bcrypt";

const seed = async () => {
  await AppDataSource.initialize();

  const adminRepo = AppDataSource.getRepository(Admin);
  const roleRepo = AppDataSource.getRepository(Role);
  const permissionRepo = AppDataSource.getRepository(Permission);

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const adminRole = roleRepo.create({ name: "Admin", description: "Full access" });
  const manageUsersPermission = permissionRepo.create({ name: "manage_users", description: "Can manage users" });

  await roleRepo.save(adminRole);
  await permissionRepo.save(manageUsersPermission);

  const admin = adminRepo.create({ username: "admin", passwordHash: hashedPassword, roles: [adminRole] });
  await adminRepo.save(admin);

  console.log("Seed data created!");
};

seed();
