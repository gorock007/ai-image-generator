const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();
//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Static file
app.use(express.static(path.join(__dirname)))

app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Running on port ${port}` || 3000 ));
