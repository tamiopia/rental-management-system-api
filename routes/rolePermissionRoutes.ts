import { Router } from "express";
import {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  assignPermissionToRole,
  removePermissionFromRole,
} from "../controllers/rolePermissionController";

const router = Router();

// Role routes
router.get("/roles", getRoles); // Get all roles
router.post("/roles", createRole); // Create a new role
router.put("/roles/:id", updateRole); // Update a role
router.delete("/roles/:id", deleteRole); // Delete a role

// Permission routes
router.get("/permissions", getPermissions); // Get all permissions
router.post("/permissions", createPermission); // Create a new permission
router.put("/permissions/:id", updatePermission); // Update a permission
router.delete("/permissions/:id", deletePermission); // Delete a permission

// Role-Permission management routes
router.post("/roles/:roleId/permissions/:permissionId", assignPermissionToRole); // Assign a permission to a role
router.delete("/roles/:roleId/permissions/:permissionId", removePermissionFromRole); // Remove a permission from a role

export default router;
