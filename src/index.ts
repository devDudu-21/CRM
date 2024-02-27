import "reflect-metadata";
import express from "express";

import customerRoutes from "./routes/customerRoutes";
import taskRoutes from "./routes/taskRoutes";
import adminRoutes from "./routes/adminRoutes";

const port = process.env.APP_PORT || 3000;

const app = express();
app.use(express.json());

app.use("/customers", customerRoutes);
app.use("/tasks", taskRoutes);
app.use("/admins", adminRoutes);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
