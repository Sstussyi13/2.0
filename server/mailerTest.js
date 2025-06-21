import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.MAIL_USER,
  to: process.env.MAIL_RECEIVER,
  subject: "Test from nodemailer",
  text: "Если ты это читаешь — значит, почта живёт.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Ошибка отправки:", error);
  } else {
    console.log("Письмо отправлено:", info.response);
  }
});
