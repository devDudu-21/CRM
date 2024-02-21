import { DataSource } from "typeorm";
import { Customer } from "./models/Customer";
import { Task } from "./models/Task";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Customer, Task],
  subscribers: [],
  migrations: [],
});
