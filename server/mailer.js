import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your@gmail.com',
    pass: 'app-password',
  },
});

export async function sendEmail({ full_name, phone, message }) {
  await transporter.sendMail({
    from: '"Сайт ПТО" <your@gmail.com>',
    to: 'your@gmail.com',
    subject: 'Новая заявка с сайта',
    text: `Имя: ${full_name}\nТелефон: ${phone}\nСообщение: ${message}`,
  });
}
