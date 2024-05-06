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

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const { likes } = request.body;
  
  if(likes === null || likes === undefined || typeof(likes) !== "number" || likes < 0) {
    return response.status(400).json( { message: "Invalid input" });
  }

  const blogTobeUpdated = await Blog.findById(id);

  if(!blogTobeUpdated) {
    return response.status(404).json({ message: "Blog not found" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, {
    likes: likes || blogTobeUpdated.likes
  }, {
    new: true,
    runValidators: true,
    context: "query"
  });

  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;