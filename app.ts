import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./database/dataSource";
import tenantRoutes from "./routes/tenantRoutes";
import adminroute from "./routes/adminRoutes";
import rolePermission from "./routes/rolePermissionRoutes";

const app = express();

app.use(express.json());
app.use("/api/tenants", tenantRoutes);
app.use("/api/auth", adminroute);
app.use("/api/auth", rolePermission);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => console.log("Error: ", error));

export default app;

