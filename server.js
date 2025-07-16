const express = require('express');
const cors = require('cors');
const { run } = require('./index.js');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'https://automation-wb-m5rk.vercel.app' }));
app.use(express.static('.'));
app.use(express.json());

app.post('/run-script', async (req, res) => {
  try {
    const { searchQuery, pageStart, pageEnd, question } = req.body;
    await run(searchQuery, pageStart, pageEnd, question);
    res.status(200).send('Скрипт завершен');
  } catch (error) {
    console.error('Ошибка выполнения скрипта:', error);
    res.status(500).send('Ошибка выполнения скрипта');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
