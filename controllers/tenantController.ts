import { Request, Response } from "express";
import { AppDataSource } from "../database/dataSource";
import { Tenant } from "../entities/Tenant";

export const getTenants = async (_req: Request, res: Response) => {
  const tenantRepo = AppDataSource.getRepository(Tenant);
  const tenants = await tenantRepo.find();
  res.json(tenants);
};

export const createTenant = async (req: Request, res: Response) => {
  const tenantRepo = AppDataSource.getRepository(Tenant);
  const tenant = tenantRepo.create(req.body);
  const result = await tenantRepo.save(tenant);
  res.json(result);
};

