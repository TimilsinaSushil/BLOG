const jwt = require('jsonwebtoken');

module.exports = (_id) => {
    return jwt.sign({_id}, '1234-5678', {expiresIn:"3d"})
}