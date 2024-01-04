const express = require('express')
const app = express()
const cors = require('cors')
const connectDb = require('./db/connectDb');
const blogRouter = require('./controllers/blogRoutes');

connectDb();

app.use(cors())
app.use(express.json())

app.use("/api/blogs",blogRouter);

module.exports = app;