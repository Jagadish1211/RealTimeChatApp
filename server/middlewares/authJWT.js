const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], "THIS_IS_API_SECRET", (err, decode) => {
            if (err) {
                req.user = undefined;
                next();
            }
            User.findOne({email: decode.email}).exec((err, user) => {
                if (err) { return res.status(500).send({message: err})}
                else {
                    req.user = user;
                    next();

                }
            })
    })
} else {
    req.user = undefined;
    next();
}
};


module.exports = verifyToken;