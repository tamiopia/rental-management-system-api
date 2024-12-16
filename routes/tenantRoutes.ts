import { Router } from "express";
import { getTenants, createTenant } from "../controllers/tenantController";

const router = Router();

router.get("/", getTenants);
router.post("/", createTenant);

export default router;

