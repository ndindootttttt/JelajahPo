const express = require('express');
const app = express();
const PORT = 3001;
const mysql = require('mysql2'); 

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jelajahpo_db'
});
 
db.connect(err => {
  if (err) {
    console.error('Gagal konek ke database:', err);
  } else {
    console.log('Berhasil konek ke database JelajahPo');
  }
})

app.use(express.json());
 
app.get('/', (req, res) => {
  res.send('Selamat Datang di JelajahPo API 💄 ');
});

app.get('/wisata', (req, res) => {
  const sql = 'SELECT * FROM wisata';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get('/kategori', (req, res) => {
  const sql = 'SELECT * FROM kategori';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server JelajahPo jalan di http://localhost:${PORT}`);
});