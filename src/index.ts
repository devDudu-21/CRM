import "reflect-metadata";
import { AppDataSource } from "./data-source";
import customerRoutes from "./routes/customerRoutes";
import taskRoutes from "./routes/taskRoutes";
import express from "express";

const port = process.env.APP_PORT || 3000;

const app = express();
app.use(express.json());

app.use("/customers", customerRoutes);
app.use("/tasks", taskRoutes);

app.listen(port, () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
    })
    .catch((error) => console.log(error));
  console.log(`Server running on port ${port}`);
});
