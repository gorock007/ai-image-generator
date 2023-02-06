const express = require('/Users/goroc/ai-image-generator/node_modules/express');
const dotenv = require('dotenv').config();
const path = require('path');

const port = process.env.PORT;
const app = express();

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Static folder
app.use(express.static(path.join(__dirname, 'frontend')))

app.use('/openai', require('./routes/openaiRoutes'))

app.listen(port, () => console.log(`Running on port ${port}` || 3000 ));
