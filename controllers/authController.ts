import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/dataSource";
import { Admin } from "../entities/Admin";
import { Role } from "../entities/Role";

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const adminRepo = AppDataSource.getRepository(Admin);

    const admin = await adminRepo.findOne({
      where: { email },
      relations: ["roles", "roles.permissions"], // Include roles and permissions
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: admin.id,
        roles: admin.roles.map((role) => role.name),
        permissions: admin.roles.flatMap((role) =>
          role.permissions.map((perm) => perm.name)
        ),
      },
      process.env.JWT_SECRET || "default_secret_key", // Use environment variable for security
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signup = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password, roleId } = req.body;

    if (!email || !password || !roleId) {
      return res.status(400).json({ message: "Email, password, and role are required" });
    }

    const adminRepo = AppDataSource.getRepository(Admin);
    const roleRepo = AppDataSource.getRepository(Role);

    // Check if the email is already taken
    const existingAdmin = await adminRepo.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    // Find the specified role
    const role = await roleRepo.findOne({ where: { id: roleId } });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin
    const admin = adminRepo.create({
      email,
      passwordHash: hashedPassword,
      roles: [role], // Assign the specified role
    });

    await adminRepo.save(admin);

    return res.status(201).json({
      message: "Admin created successfully",
      admin: { email, roles: [role.name] },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
