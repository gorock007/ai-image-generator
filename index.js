const express = require('express');
const dotenv = require('dotenv').config();

const port = process.env.PORT;
const app = express();

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Running on port ${port}` ));
