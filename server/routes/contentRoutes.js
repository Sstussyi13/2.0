import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Получить ВСЕ ключи контента
router.get('/all', (req, res) => {
  db.all(`SELECT key, value FROM editable_content`, (err, rows) => {
    if (err) {
      console.error('Ошибка при получении контента:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    res.json(rows);
  });
});

// Получить контент по ключу
router.get('/:key', (req, res) => {
  const { key } = req.params;
  db.get(`SELECT value FROM editable_content WHERE key = ?`, [key], (err, row) => {
    if (err) {
      console.error('Ошибка при получении контента по ключу:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }
    if (!row) return res.status(404).json({ error: 'Не найдено' });
    res.json({ key, value: JSON.parse(row.value) });
  });
});

export default router;
