import { DataSource } from "typeorm";
import { Customer } from "./models/Customer";
import { Task } from "./models/Task";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [Customer, Task],
  subscribers: [],
  migrations: [],
});
