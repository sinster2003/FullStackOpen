const errorHandler = (error, request, response, next) => {
    if(error.name === "CastError") {
        return response.status(400).json({error: "malformatted id"});
    }

    if(error.name === "ValidationError") {
        return response.status(400).json({error: "Invalid data recieved"});
    }

    if(error.code === 11000) {
        return response.status(400).json({error: "Username already taken"});
    }

    response.status(500).json({error: "Something went wrong"});
}

module.exports = errorHandler;