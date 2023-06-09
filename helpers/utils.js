const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
//Crear token con user id y role
const createToken = (user) => {
    const obj = {
        user_id: user._id,
        role: user.role,
        exp: dayjs().add(5, 'days').unix()
    }
    return jwt.sign(obj, 'clave ultra secretisima');
}

module.exports = {
    createToken
}