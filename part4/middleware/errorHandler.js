const errorHandler = (error, request, response, next) => {
    console.log(error.name);

    if(error.name === "CastError") {
        return response.status(500).json({error: "malformatted id"});
    }

    if(error.name === "ValidationError") {
        return response.status(500).json({error: "Invalid data recieved"});
    }

    response.status(500).json({error: "Something went wrong"});
}

module.exports = errorHandler;