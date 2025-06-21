import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import db from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.use(cors());
app.use(express.json());

// API
app.use('/api', routes);
app.get('/ping', (_, res) => res.send('pong'));

// Frontend
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Запуск
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});
