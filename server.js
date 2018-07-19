const path = require('path');

const express = require('express');
const app = express();

app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(3020, () => {
  // tslint:disable-next-line
  console.log('Server started...');
});
