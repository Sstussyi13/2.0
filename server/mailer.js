import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP не готов:', err);
  } else {
    console.log('✅ SMTP готов к работе');
  }
});

export function sendEmail({ full_name, phone, service_type, message }) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_RECEIVER,
    subject: '🔥 Новая заявка с сайта',
    html: `
      <h2>Новая заявка</h2>
      <p><strong>Имя:</strong> ${full_name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Тип услуги:</strong> ${service_type || "Не указано"}</p>
      <p><strong>Сообщение:</strong><br>${message}</p>
    `,
  };

  console.log('📨 Отправляем письмо...');

  return transporter.sendMail(mailOptions);
}
