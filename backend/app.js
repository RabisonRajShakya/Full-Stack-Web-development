var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRoutes');
// var professorRouter = require('./routes/professor');
var adminRouter = require('./routes/adminRoutes');
var questionRoutes = require('./routes/questionRoutes');
var profileRoutes = require('./routes/profileRoutes');


var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/professor', professorRouter);
app.use('/api/admin', adminRouter);
app.use('/api/questions', questionRoutes);
app.use('/api/profile', profileRoutes);


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI,
        {
        dbName: "professor_database",
    }
    )
        .then((data) => {
            console.log("Database connected successfully", data.connection.name);
        });

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = app;
