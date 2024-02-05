const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blogs");
const { default: mongoose } = require("mongoose");

const api = supertest(app); // superagent object

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url:
        "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

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

        const result = await api.get("/api/blogs")
        .expect(200)
        .expect("Content-type", /application\/json/)

        expect(result.body).toHaveLength(initialBlogs.length + 1);
        
        const titleList = result.body.map(blog => blog.title);
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

        const result = await api.get("/api/blogs")
        .expect(200)
        .expect("Content-type", /application\/json/)

        expect(result.body).toHaveLength(initialBlogs.length + 1);

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

        const result = await api.get("/api/blogs")
        .expect(200)
        .expect("Content-type", /application\/json/)

        expect(result.body).toHaveLength(initialBlogs.length);
    })
})

afterAll(async () => {
    await mongoose.connection.close();
})