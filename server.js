const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

app.use(express.json())

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening!'));
})