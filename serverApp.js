const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//import server routers
const userRouters = require('./routers/users');
const coursesRouters = require('./routers/courses');
const gradesRouters = require('./routers/grades');
const sendEmail = require('./routers/sendEmail');

//express server
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
//Database link connection
const db = process.env.DB_HOST;

//Server Routers
app.use(userRouters);
app.use(coursesRouters);
app.use(gradesRouters);
app.use(sendEmail);

app.use('/', (req, res, next) => {
  res.send('Hellow from server');
});

//conection dataBase and server
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log('connected to MongoDB'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
