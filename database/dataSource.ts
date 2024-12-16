import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "rental_management",
  entities: ["./entities/*.ts"],
  synchronize: true,
  logging: false,
});

