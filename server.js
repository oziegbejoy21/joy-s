const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
//dot env conf
dotenv.config();

//rest object
const app = express();


//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
// URL =>http://localhost:8080
app.use('/api/vl/test', require('./routes/testRoute'));
app.get('/', (req, res) => {
    return res.
        status(200)
        .send("<h1>welcome to crunchies server app api base project</h1>");
});
//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
    console.log("server running on ${PORT}".white.bgMagenta);
});
