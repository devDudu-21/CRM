import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { Task } from "./Task";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cnpj: string;

  @Column()
  razaoSocial: string;

  @Column("jsonb")
  address: {
    rua: string;
    numero: string;
    cidade: string;
    estado: string;
    codigoPostal: string;
  };

  @Column()
  telefone: string;

  @Column()
  password: string;

  @ManyToOne((type) => Task, (task) => task.customer)
  tasks: Task[];
}
