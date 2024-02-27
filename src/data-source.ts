import "dotenv/config";

import { DataSource } from "typeorm";

import { Customer } from "./models/Customer";
import { Task } from "./models/Task";
import { Admin } from "./models/Admin";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  logging: true,
  entities: [Customer, Task, Admin],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() =>
    console.log("Conexão com o banco de dados estabelecida com sucesso!")
  )
  .catch((error) =>
    console.error("Falha ao conectar ao banco de dados:", error)
  );
