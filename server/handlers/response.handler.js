// Res Data
const responseWithData =  (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
// Error
const error = (res) => {
    responseWithData(res, 500, {
        status: 500,
        message: "Oops! SomeThing when Wrong!",
    });
};
// Bad request
const badRequest =  (res, message) => {
    responseWithData(res, 400, {
        status: 400,
        message,
    });
};

// Oke
const ok = (res, data) => {
    responseWithData(res, 200, data);
};
// Created
const created = (res, data) => {
    responseWithData(res, 201, data);
};
// unauthorize
const unauthorize = (res) => {
    responseWithData(res, 401, {
        status: 401,
        message: "UnAuthorize",
    });
};
// NotFound
const notFound = (res) => {
    responseWithData(res, 404, {
        status: 404,
        message: "ReSource not Found!",
    });
};

export default {
    error,
    badRequest,
    ok,
    created,
    notFound,
    unauthorize
};




