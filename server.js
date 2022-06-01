const app = require('./src/app');
require('dotenv').config();

const mongoose = require('mongoose');

require('dotenv').config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server running. Use our API on port:', PORT);
    });
    console.log('Database connection successful');
  })
  .catch(err => {
    console.error('Could not connect to MongoDB...', err);
    process.exit(1);
  });
