const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sellersRoutes = require('./routes/sellers-routes');
const slotsRoutes = require('./routes/slots-routes');
const requestsRoutes = require('./routes/requests-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/api/sellers', sellersRoutes);
app.use('/api/slots', slotsRoutes);
app.use('/api/requests', requestsRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});



app.use((error, req, res, next) => {

  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@project1-cluster.4fvtp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
  });

