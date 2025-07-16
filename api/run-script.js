const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use(express.static('.'));

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    exec('node index.js', (error, stdout, stderr) => {
      if (error) {
        console.error('Ошибка выполнения скрипта:', stderr);
        return res.status(500).send('Ошибка выполнения скрипта');
      }
      console.log('Скрипт выполнен:', stdout);
      res.status(200).send('Скрипт завершен');
    });
  } else {
    res.status(405).send('Метод не поддерживается');
  }
};