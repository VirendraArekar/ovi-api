require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
var cors = require("cors");
const app = express();
var path = require('path');
const bodyParser = require('body-parser')
const morgan = require("morgan")

//Root Router
const routes = require("./routes");

var dirname = __dirname;
dirname = dirname.replace('src', '')

//Middleware
mongoose.set('debug', true);
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.use("/api/v1", routes);

const db_url = process.env.DB_URL;
const port = process.env.PORT || 3005;

const db_config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})
mongoose
    .connect(db_url, db_config)
    .then((status) => {
        console.log(`connnected to database successfully`);
    })
    .catch((err) => {
        console.log(`error in connecting to database - ${err}`);
    });

//Server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
