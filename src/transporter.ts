import { NextFunction, Request, Response } from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.TRANSPORTER_USER,
    pass: process.env.TRANSPORTER_PASS,
  },
});

async function sendEmail(req: Request, res: Response, next: NextFunction) {
  try {
    await transporter.sendMail({
      from: process.env.TRANSPORTER_FROM,
      to: req.body.email,
      subject: "Olá, seja bem-vindo",
      text: "Obrigado por se cadastrar",
      html: "<b>Obrigado por se cadastrar</b>",
    });
    next();
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
}

export default sendEmail;
