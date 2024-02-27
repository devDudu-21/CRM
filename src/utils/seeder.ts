import "dotenv/config";

import { Admin } from "../models/Admin";
import { AppDataSource } from "../data-source";
import * as hash from "./hash";

const seeder = async () => {
  const adminRepository = AppDataSource.getRepository(Admin);

  const admins = [
    {
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    },
  ];

  for (const admin of admins) {
    if (!admin.password) {
      console.log("Verifique as credenciais do admin");
      return;
    }
    const hashedPassword = await hash.generateHash(admin.password);

    const newAdmin = adminRepository.create({
      name: admin.name,
      email: admin.email,
      password: hashedPassword,
    });

    await adminRepository.save(newAdmin);
  }
  console.log("Admins seeded!");
};

seeder().then(() => process.exit());
