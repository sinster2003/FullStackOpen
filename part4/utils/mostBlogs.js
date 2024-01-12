const lodash = require("lodash");

const mostBlogs = (blogs) => {

    if(blogs?.length === 0) {
        return {};
    }

    const countedObject = lodash.countBy(blogs, "author");
    const maxBlogs = lodash.max(lodash.values(countedObject)); // max of blogs values
    const maxBlogsIndex = lodash.values(countedObject).indexOf(maxBlogs); // get the index of max blogs
    const maxBlogsAuthor = lodash.keys(countedObject)[maxBlogsIndex]; // match the index with the auhtor
    return ({
        author: maxBlogsAuthor,
        blogs: maxBlogs
    });
}

module.exports = {
    mostBlogs
}