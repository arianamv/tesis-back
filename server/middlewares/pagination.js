

function paginationMiddleware(pageSize) {

    return (req, res, next) => {
        const pageNumber = parseInt(req.body.paginaSolicitar) || 1; // Get the current page number from the query parameters
        console.log("pagin solicitar es" + pageNumber)
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        console.log("EndInedex es" + endIndex)
        // Attach pagination data to the request object
        req.pagination = {
            page: pageNumber,
            limit: pageSize,
            startIndex,
            endIndex
        };

        next(); // Call the next middleware
    };
}

module.exports = paginationMiddleware;