const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('browser'));

const apiRouter = require('./server/api');
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.redirect('/browser/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});