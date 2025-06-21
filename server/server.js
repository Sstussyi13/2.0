import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import routes from './routes/index.js';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());

// API
app.use('/api', routes);
app.get('/ping', (_, res) => res.send('pong'));

// 👉 Подключаем frontend
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Убиваем процесс, занимающий порт
function killPort(port) {
  try {
    const stdout = execSync(`netstat -aon | findstr :${port}`).toString();
    const lines = stdout.split('\n').filter(line => line.includes('LISTENING'));
    const pids = [...new Set(lines.map(line => line.trim().split(/\s+/).pop()))];

    pids.forEach(pid => {
      try {
        execSync(`taskkill /PID ${pid} /F`);
        console.log(`🧹 Завершён процесс PID ${pid}, занимавший порт ${port}`);
      } catch (err) {
        console.error(`❌ Не удалось завершить процесс ${pid}:`, err.message);
      }
    });
  } catch {
    // Порт не занят — ок
  }
}

// ⏳ Задержка перед запуском
killPort(PORT);
setTimeout(() => {
  app.listen(PORT, () => {
    console.log(`✅ Сервер поднят на ${PORT}`);
  });
}, 1500);
