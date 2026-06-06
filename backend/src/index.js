require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {initDB} = require('./db');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.json({message: 'сервер запущен'});
})

const PORT = process.env.PORT || 5000;

const start = async () => {
    await initDB();
    app.listen(PORT, () => {
        console.log(`сервер запущен на порту ${PORT}`)
    });
};

start();