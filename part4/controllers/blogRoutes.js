const Blog = require("../models/blogs");
const blogRouter = require("express").Router();

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
});

blogRouter.post("/", async (request, response) => {
    const body = request.body;

    if(!body.title || !body.url) {
      return response.status(400).json({message: "Title and Url are required"});
    }

    const blog = new Blog({
      ...body,
      likes: body.likes || 0
    })
  
    const result = await blog.save()
    response.status(201).json(result)
});

blogRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  const blogToBeDeleted = await Blog.findById(id);

  if(!blogToBeDeleted) {
    return response.status(404).json({message: "Blog not found"});
  }

  await Blog.findByIdAndDelete(id);

  response.status(204).end();
})

module.exports = blogRouter;