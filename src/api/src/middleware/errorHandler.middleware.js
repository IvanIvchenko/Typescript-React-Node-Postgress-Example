module.exports = (error, req, res, next) => {
    if (!error.statusCode) {
        error.statusCode = 500
    };
    res.status(error.statusCode).json({message: error.message})
}