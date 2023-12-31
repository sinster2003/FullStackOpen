const Blog = require("../models/blogs");
const blogRouter = require("express").Router();

blogRouter.get("/", (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => console.log(error));
});

blogRouter.post("/", (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => console.log(error));
});

module.exports = blogRouter;