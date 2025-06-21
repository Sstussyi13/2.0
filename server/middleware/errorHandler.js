export const errorHandler = (err, req, res, next) => {
  console.error('💥 Server error:', err.stack || err);
  res.status(500).json({ error: 'Что-то пошло не так. Сервер охуел.' });
};
