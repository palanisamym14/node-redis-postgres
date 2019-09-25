import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.authorization;
    next();
};
