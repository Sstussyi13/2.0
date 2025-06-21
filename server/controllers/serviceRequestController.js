import db from "../config/db.js";
import nodemailer from "nodemailer";

// === Настройка транспорта ===
const transporter = nodemailer.createTransport({
  service: "gmail", // или "Brevo", если ты будешь использовать smtp-relay.brevo.com
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const submitRequest = (req, res) => {
  const { full_name, phone, service_type, message } = req.body;

  if (!full_name || !phone || !message) {
    return res.status(400).json({ error: "Все поля обязательны" });
  }

  const stmt = db.prepare(`
    INSERT INTO applications (full_name, phone, service_type, message)
    VALUES (?, ?, ?, ?)
  `);

  stmt.run([full_name, phone, service_type, message], (err) => {
    if (err) {
      console.error("Ошибка сохранения в БД:", err);
      return res.status(500).json({ error: "Ошибка при сохранении заявки" });
    }

    // === Отправка письма ===
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: process.env.MAIL_RECEIVER,
      subject: "Новая заявка с сайта",
      html: `
        <h2>Новая заявка</h2>
        <p><strong>Имя:</strong> ${full_name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Тип услуги:</strong> ${service_type || "Не указано"}</p>
        <p><strong>Сообщение:</strong><br>${message}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Ошибка при отправке письма:", error);
        return res.status(500).json({ error: "Заявка сохранена, но письмо не отправлено" });
      } else {
        console.log("Письмо отправлено:", info.response);
        return res.status(201).json({ message: "Заявка успешно отправлена и сохранена" });
      }
    });
  });
};
