const listHelper = require("../utils/lists_helper");

test("dummy must return one", () => {
    const blogs = [];

    console.log(listHelper)

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1);
});