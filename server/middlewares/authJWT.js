const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], "THIS_IS_API_SECRET", (err, decode) => {
            if (err) {
                return res.status(403).send({message: "Authorization failed"});
            }
            User.findOne({email: decode.id}).exec((err, user) => {
                if (err) { return res.status(500).send({message: err})}
                else {
                    req.user = user;
                    next();

                }
            })
    })
} else {
    res.status(401).send({message: "Unauthorized request"});
}
};


module.exports = verifyToken;