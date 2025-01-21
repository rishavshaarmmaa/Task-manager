const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const tasksRouter = require('./routes/tasks'); // Import routes
const app = express();
require('dotenv').config();


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('ejs-mate'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use the tasks router
app.use('/', tasksRouter);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
