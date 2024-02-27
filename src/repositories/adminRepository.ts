import { AppDataSource } from "../data-source";
import { Admin } from "../models/Admin";

export const adminRepository = AppDataSource.getRepository(Admin);
