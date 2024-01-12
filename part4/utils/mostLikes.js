const lodash = require("lodash");

const mostLikes = (blogs) => {
  if (blogs?.length === 0) {
    return {};
  }

  const groupedObject = lodash.groupBy(blogs, "author");
  const mappedArray = lodash.values(groupedObject).map((value) => {
    const sum = lodash.sumBy(value, "likes");
    return sum;
  });
  const maxLikes = lodash.max(mappedArray);
  const maxLikesindex = mappedArray.indexOf(maxLikes);
  const topBlogger = lodash.keys(groupedObject)[maxLikesindex];
  return ({
    author: topBlogger,
    likes: maxLikes
  })
};

module.exports = {
  mostLikes
}
