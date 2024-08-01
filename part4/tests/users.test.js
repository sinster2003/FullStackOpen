const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/users");

const api = supertest(app);

describe("testing the userRoutes", () => {
    test("invalid user with no name", async () => {
        const result = await api.post("/api/users")
        .send({
            username: "Sha",
            password: "durban123"
        })
        .expect(400)
        .expect("Content-type", /application\/json/)

        console.log(result.body);
        expect(result.body).toEqual({ message: "Username and Name are mandatory." })
    });

    test("invalid user with no username", async () => {
        const result = await api.post("/api/users")
        .send({
            name: "Sha",
            password: "durban123"
        })
        .expect(400)
        .expect("Content-type", /application\/json/)

        console.log(result.body);
        expect(result.body).toEqual({ message: "Username and Name are mandatory." })
    });

    test("invalid user with name less than 3 characters", async () => {
        const result = await api.post("/api/users")
        .send({
            username: "Sha",
            name: "L",
            password: "durban123"
        })
        .expect(400)
        .expect("Content-type", /application\/json/)

        console.log(result.body);
        expect(result.body).toEqual({ message: "Username and Name must be atleast 3 characters long." });
    });

    test("invalid user with username less than 3 characters", async () => {
        const result = await api.post("/api/users")
        .send({
            username: "L",
            name: "Benjamin",
            password: "durban123"
        })
        .expect(400)
        .expect("Content-type", /application\/json/)

        console.log(result.body);
        expect(result.body).toEqual({ message: "Username and Name must be atleast 3 characters long." });
    });

    test("invalid password with less than 6 characters", async () => {
        const result = await api.post("/api/users")
        .send({
            username: "Sha",
            name: "Lander",
            password: "dur"
        })
        .expect(400)
        .expect("Content-type", /application\/json/)

        console.log(result.body);
        expect(result.body).toEqual({ message: "Invalid Inputs" });
    });

    test("invalid password", async () => {
        
        const result = await api.post("/api/users")
        .send({
            username: "Sha",
            name: "Lander",
        })
        .expect(400)
        .expect("Content-type", /application\/json/)

        console.log(result.body);
        expect(result.body).toEqual({ message: "Invalid Inputs" });
    });

    test("unique username test", async () => {
       const result = await api.post("/api/users")
        .send({
          username: "Sha",
          name: "Georgie",
          password: "Georgie123"
        })
        .expect(400)
        .expect("Content-type", /application\/json/)

        expect(result.body).toEqual({error: "Username already taken"});
    })
});

afterAll(async () => {
    await mongoose.connection.close();
});
