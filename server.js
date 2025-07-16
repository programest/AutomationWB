const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('.')); // Обслуживание статических файлов (index.html, results.json)

app.post('/run-script', (req, res) => {
  exec('node index.js', (error, stdout, stderr) => {
    if (error) {
      console.error('Ошибка выполнения скрипта:', stderr);
      return res.status(500).send('Ошибка выполнения скрипта');
    }
    console.log('Скрипт выполнен:', stdout);
    res.status(200).send('Скрипт завершен');
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});