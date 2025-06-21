import db from '../config/db.js';

export const submitRequest = async (req, res, next) => {
  try {
    const { full_name, phone, service_type, message } = req.body;

    if (!full_name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    const dbConn = await db;

    await dbConn.run(
      `INSERT INTO applications (full_name, phone, service_type, message)
       VALUES (?, ?, ?, ?)`,
      [full_name, phone, service_type || '', message || '']
    );

    res.status(201).json({ message: 'Заявка успешно отправлена и сохранена' });
  } catch (err) {
    console.error('💥 Ошибка в контроллере:', err);
    next(err);
  }
};
