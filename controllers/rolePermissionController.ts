import { Request, Response } from "express";
import { AppDataSource } from "../database/dataSource";
import { Role } from "../entities/Role";
import { Permission } from "../entities/Permission";

// Get all roles
export const getRoles = async (_req: Request, res: Response) => {
  const roleRepo = AppDataSource.getRepository(Role);
  const roles = await roleRepo.find({ relations: ["permissions"] });
  res.json(roles);
};

// Create a new role
export const createRole = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const roleRepo = AppDataSource.getRepository(Role);

  const existingRole = await roleRepo.findOne({ where: { name } });
  if (existingRole) {
    return res.status(409).json({ message: "Role already exists" });
  }

  const role = roleRepo.create({ name, description });
  await roleRepo.save(role);
  res.status(201).json({ message: "Role created successfully", role });
};

// Update a role
export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const roleRepo = AppDataSource.getRepository(Role);

  const role = await roleRepo.findOne({ where: { id: parseInt(id, 10) } });
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  role.name = name || role.name;
  role.description = description || role.description;
  await roleRepo.save(role);

  res.json({ message: "Role updated successfully", role });
};

// Delete a role
export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const roleRepo = AppDataSource.getRepository(Role);

  const role = await roleRepo.findOne({ where: { id: parseInt(id, 10) } });
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  await roleRepo.remove(role);
  res.json({ message: "Role deleted successfully" });
};

// Get all permissions
export const getPermissions = async (_req: Request, res: Response) => {
  const permissionRepo = AppDataSource.getRepository(Permission);
  const permissions = await permissionRepo.find();
  res.json(permissions);
};

// Create a new permission
export const createPermission = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const permissionRepo = AppDataSource.getRepository(Permission);

  const existingPermission = await permissionRepo.findOne({ where: { name } });
  if (existingPermission) {
    return res.status(409).json({ message: "Permission already exists" });
  }

  const permission = permissionRepo.create({ name, description });
  await permissionRepo.save(permission);
  res.status(201).json({ message: "Permission created successfully", permission });
};

// Update a permission
export const updatePermission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const permissionRepo = AppDataSource.getRepository(Permission);

  const permission = await permissionRepo.findOne({ where: { id: parseInt(id, 10) } });
  if (!permission) {
    return res.status(404).json({ message: "Permission not found" });
  }

  permission.name = name || permission.name;
  permission.description = description || permission.description;
  await permissionRepo.save(permission);

  res.json({ message: "Permission updated successfully", permission });
};

// Delete a permission
export const deletePermission = async (req: Request, res: Response) => {
  const { id } = req.params;
  const permissionRepo = AppDataSource.getRepository(Permission);

  const permission = await permissionRepo.findOne({ where: { id: parseInt(id, 10) } });
  if (!permission) {
    return res.status(404).json({ message: "Permission not found" });
  }

  await permissionRepo.remove(permission);
  res.json({ message: "Permission deleted successfully" });
};

// Assign a permission to a role
export const assignPermissionToRole = async (req: Request, res: Response) => {
  const { roleId, permissionId } = req.params;
  const roleRepo = AppDataSource.getRepository(Role);
  const permissionRepo = AppDataSource.getRepository(Permission);

  const role = await roleRepo.findOne({ where: { id: parseInt(roleId, 10) }, relations: ["permissions"] });
  const permission = await permissionRepo.findOne({ where: { id: parseInt(permissionId, 10) } });

  if (!role || !permission) {
    return res.status(404).json({ message: "Role or Permission not found" });
  }

  if (role.permissions.some((perm) => perm.id === permission.id)) {
    return res.status(409).json({ message: "Permission already assigned to this role" });
  }

  role.permissions.push(permission);
  await roleRepo.save(role);

  res.json({ message: "Permission assigned successfully" });
};

// Remove a permission from a role
export const removePermissionFromRole = async (req: Request, res: Response) => {
  const { roleId, permissionId } = req.params;
  const roleRepo = AppDataSource.getRepository(Role);

  const role = await roleRepo.findOne({ where: { id: parseInt(roleId, 10) }, relations: ["permissions"] });
  if (!role) {
    return res.status(404).json({ message: "Role not found" });
  }

  role.permissions = role.permissions.filter((perm) => perm.id !== parseInt(permissionId, 10));
  await roleRepo.save(role);

  res.json({ message: "Permission removed successfully" });
};
