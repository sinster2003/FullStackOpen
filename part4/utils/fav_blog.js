const favouriteBlog = (blogs) => {

    if(blogs.length === 0) {
        return {};
    }

    let maxObject = blogs[0];
    let max = blogs[0].likes;

    blogs.forEach((blog) => {
        if(blog.likes > max) {
            max = blog.likes;
            maxObject = blog;
        }
    });  

    const resultObject = {
        title: maxObject.title,
        author: maxObject.author,
        likes: maxObject.likes
    };

    return resultObject;
}   

module.exports = {
    favouriteBlog
}