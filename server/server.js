import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import routes from './routes/index.js';
import { execSync } from 'child_process';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.get('/ping', (_, res) => res.send('pong'));

// Автоматическое завершение процесса, занимающего порт
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
    // порт не занят — ничего не делаем
  }
}

// Убиваем, если занят, и запускаем сервер с задержкой
killPort(PORT);
setTimeout(() => {
  app.listen(PORT, () => {
    console.log(`✅ Сервер поднят на ${PORT}`);
  });
}, 1500);
