const express = require('express')
const app = express()
require("express-async-errors");
const cors = require('cors')
const connectDb = require('./db/connectDb');
const blogRouter = require('./controllers/blogRoutes');
const errorHandler = require('./middleware/errorHandler');

connectDb();

app.use(cors())
app.use(express.json())

app.use("/api/blogs",blogRouter);

app.use(errorHandler);

module.exports = app;