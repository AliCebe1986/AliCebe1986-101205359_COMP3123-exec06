const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const NoteRoutes = require('./routes/NoteRoutes');

//const DB_URL = "mongodb+srv://sa:s3cr3t@cluster0.qa3t4.mongodb.net/gbc-fall2020?retryWrites=true&w=majority"
const DB_URL = "mongodb://localhost:27017/notesapp";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', NoteRoutes);

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
}).then(() => {
    console.log("Successfully connected to the database mongoDB");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});