const express = require('express');
const multer = require('multer');
const path = require('path');
const { getFileHash } = require('./utils/hash');

const app = express();
const PORT = 3000;

// configurare upload folder temporar
const upload = multer({ dest: 'uploads/' });

// Blacklist simplu
const blacklist = [
 
  '275a021bbfb64810a2f2e4e6a0b9f69e3a7a2e77f67867f8421e73f7b6d57e5a',
]; // hash de test (EICAR)


// Servim pagina web
app.use(express.static('public'));

// Endpoint pentru upload
app.post('/scan', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const fileName = req.file.originalname;

  const hash = getFileHash(filePath);
  const verdict = blacklist.includes(hash) ? 'SUSPICIOUS' : 'CLEAN';

  res.send(`
    <p>Fișier: ${fileName}</p>
    <p>SHA-256: ${hash}</p>
    <p>Verdict: ${verdict}</p>
    <a href="/">Încarcă alt fișier</a>
  `);
});

app.listen(PORT, () => {
  console.log(`Server pornit la http://localhost:${PORT}`);
});

