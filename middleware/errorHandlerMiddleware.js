import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    msg: err.message || "Something went wrong",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  res.status(customError.statusCode).json({ errMsg: customError.msg });
};

export default errorHandlerMiddleware;
