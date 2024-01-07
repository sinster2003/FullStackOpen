const totalLikes = (blogs) => {
    // reducer function
    const totalLikesSum = blogs.reduce((sum, item) => {
        return sum + item.likes;
    }, 0);

    return totalLikesSum;
}

module.exports = {
    totalLikes
}