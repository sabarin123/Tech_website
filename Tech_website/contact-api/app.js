require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const contactController = require('./src/controllers/contactController');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Contact API is running.'));
app.post('/api/contact', contactController.createContact);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
