const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");
const { default: mongoose } = require("mongoose");
const { initialBlogs, nonExistingId, blogsInDB } = require("./test_helper");

const api = supertest(app); // superagent object

beforeEach(async () => {
    await Blog.deleteMany({});
    for(let blog of initialBlogs) {
        const blogObject = new Blog(blog);
        await blogObject.save();
    }
    console.log("done");
})

describe("testing the blog routes", () => {
    test("testing http get requests", async () => {
        const result = await api.get("/api/blogs")
        .expect(200)
        .expect("Content-type", /application\/json/)
        
        console.log(result.body);
        expect(result.body).toHaveLength(initialBlogs.length)
    })

    test("checking unique identifier format", async () => {
        const result = await api.get("/api/blogs")
        .expect(200)
        .expect("Content-type", /application\/json/)

        expect(result.body[0].id).toBeDefined();
    })

    test("testing http post request", async () => {
        const newBlog = {
            title: "React Best Practice",
            author: "Sin",
            url: "https://reactbestpractices.com/",
            likes: 2
        }
        
        const savedBlog = await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-type", /application\/json/)

        const result = await blogsInDB();

        expect(result).toHaveLength(initialBlogs.length + 1);
        
        const titleList = result.map(blog => blog.title);
        expect(titleList).toContain(newBlog.title);

        expect({...newBlog, id: savedBlog.body.id}).toEqual(savedBlog.body);
    })

    test("testing likes default to zero", async () => {
        const newBlog = {
            title: "React Best Practice",
            author: "Sin",
            url: "https://reactbestpractices.com/",
        }
        
        const savedBlog = await api.post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-type", /application\/json/)

        const result = await blogsInDB();

        expect(result).toHaveLength(initialBlogs.length + 1);

        expect(savedBlog.body.likes).toBe(0);
    })

    test("testing invalid post requests", async () => {
        const newBlog = {
            author: "Sin",
        }

        const newBlogWithNoTitle = {
            author: "Sin",
            url: "https://example.com"
        }

        const newBlogWithNoUrl = {
            title: "Usage of prisma for Postgress",
            author: "Sin",
        }
        
        await api.post("/api/blogs")
        .send(newBlog)
        .expect(400)
        .expect("Content-type", /application\/json/)

        await api.post("/api/blogs")
        .send(newBlogWithNoTitle)
        .expect(400)
        .expect("Content-type", /application\/json/)

        await api.post("/api/blogs")
        .send(newBlogWithNoUrl)
        .expect(400)
        .expect("Content-type", /application\/json/)

        const result = await blogsInDB();

        expect(result).toHaveLength(initialBlogs.length);
    })

    test("testing deleting a blog", async () => {
        const blogsAtStart = await blogsInDB();
        const blogtoBeDeleted = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogtoBeDeleted.id}`)
        .expect(204)

        const blogsAtEnd = await blogsInDB();

        expect(blogsAtEnd.length).toBe(initialBlogs.length - 1);

        const titles = blogsAtEnd.map(blog => blog.title);

        expect(titles).not.toContain(blogtoBeDeleted.title);
    })

    test("testing deleting a blog with invalid id", async () => {
        await api.delete(`/api/blogs/5a422a851b54a67`)
        .expect(400)
        .expect("Content-type", /application\/json/)

        const blogsAtEnd = await blogsInDB();

        expect(blogsAtEnd.length).toBe(initialBlogs.length);
    })

    test("testing deleting a blog with non existing id", async () => {
        const nonExisting_Id = await nonExistingId();
        
        await api.delete(`/api/blogs/${nonExisting_Id}`)
        .expect(404)
        .expect("Content-type", /application\/json/)

        const blogsAtEnd = await blogsInDB();

        expect(blogsAtEnd.length).toBe(initialBlogs.length);
    })

    test("testing the updating of likes in the blog", async () => {
        const blogs = await blogsInDB();
        const blogToBeUpdated = blogs[0];

        const updatedBlog = await api.put(`/api/blogs/${blogToBeUpdated.id}`)
        .send({ likes: 50 })
        .expect(200)
        .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await blogsInDB();

        expect(blogsAtEnd).toHaveLength(blogs.length);

        expect(blogsAtEnd[0]).toEqual({
            ...updatedBlog.body,
            likes: 50
        });
    })

    test("testing the updating of likes in the blog when wrong id is passed", async () => {
        const updatedBlog = await api.put("/api/blogs/gh78ghyusdbwyug7")
        .send({ likes: 99 })
        .expect(400)
        .expect("Content-Type", /application\/json/)

        expect(updatedBlog.body).toEqual({ error: "malformatted id" });
    })

    test("testing the updating of likes in the blog when non existing id is passed", async () => {
        const id = await nonExistingId();

        await api.put(`/api/blogs/${id}`)
        .send({ likes: 50 })
        .expect(404)
        .expect("Content-Type", /application\/json/)
    })

    test("testing the updating of likes in the blog with invalid inputs", async () => {
        const blogsAtStart = await blogsInDB();
        
        const updatedBlog = await api.put(`/api/blogs/${blogsAtStart[0].id}`)
        .send({ likes: -1 })
        .expect(400)
        .expect("Content-Type", /application\/json/)

        expect(updatedBlog.body).toEqual({
            message: "Invalid input"
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close();
})