const appError = require('../appError.js')

const DevError = (req, res,next,err) => {
    res.status(err.statusCode).json({
        Status: err.status,
        message:err.message
    })

    console.log({
        err:err,
        Stack:err.stack
    })
}

const ProdError = (req, res, next,err) => {
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // For non-operational errors, log the error details and send a generic message
        console.error('ERROR 💥', err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong!'
        });
    }
}


exports.ShowError = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'failed'
    if (process.env.NODE_ENV == 'development') {
        DevError(req, res, next,err)
    }
    else if (process.env.NODE_ENV == 'production') {
        ProdError(req, res, next,err)
    }
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

exports.CatchAsync=fn=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(err=>next(err))
    }
}



exports.AllRoute = async (req, res, next) => {
    next(new appError(`Cannot Find The Given ${req.originalUrl}`, 404))
}