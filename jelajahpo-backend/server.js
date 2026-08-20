const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 4000;
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

app.use(cors());
app.use(express.json())
 
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

app.post('/wisata', (req, res) => {
  const { nama_wisata, deskripsi, harga_tiket, id_kategori } = req.body;

  if (!nama_wisata || !harga_tiket) {
    return res.status(400).json({ message: 'Nama Wisata dan harga_tiket wajib diisi' });
  }

   if (!deskripsi) {
    return res.status(400).json({ message: 'Deskripsi wajib diisi' });
  }

  const sql = 'INSERT INTO wisata (nama_wisata, deskripsi, harga_tiket, id_kategori, tgl_input) VALUES (?, ?, ?, ?, NOW())';
  db.query(sql, [nama_wisata, deskripsi, harga_tiket, id_kategori], (err, result) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    res.json({
      message: 'Wisata berhasil ditambahkan!',
      id_wisata: result.insertId
    });
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