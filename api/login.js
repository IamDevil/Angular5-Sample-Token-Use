const jwt = require('jsonwebtoken');
const postgres_db = require('./postgres');

//Token Encryption
const config = require('../core/config');

/**Login
*   Input
*       user_account
*       user_pass
*  Ouput
*
*/
async function Login(req, res, next) {
    try{
        const posts = await postgres_db.oneOrNone('select * from public."UserList" where "Account" = ${name} AND "Password" = ${pwd}' , req.body);// req.body);
        if(posts === null) {
            res.status(200).json({
                success: false,
                message: 'Account or password error',
                token: {
    				"name": "",
    				"iat": 0,
    				"exp": 0,
    				"token": ""
    			}
            });
        }
        else {
            const token = await jwt.sign({
                name: req.body.name
            }, config.encryption, {
                expiresIn: 22000
            });

            const decoded = await jwt.verify(token, config.encryption);

            res.status(200).json({
                success: true,
                message: '',
                "token": {
    				"name": decoded.name,
    				"iat": decoded.iat,
    				"exp": decoded.exp,
    				"token": token
    			}
            });
        }
    }
    catch(err) {
        res.status(200).json({
            success: false,
            message: err.message,
            token: {
                "name": "",
                "iat": 0,
                "exp": 0,
                "token": ""
            }
        });
    };
}

/**Login
*   Input
*  Ouput
*/
async function RefreshToken(req, res, next) {
    if(req.decoded) {
        const token = await jwt.sign({
            name: req.decoded.name
        }, config.encryption, {
            expiresIn: 22000
        });

        const decoded = await jwt.verify(token, config.encryption);

        res.status(200).json({
            success: true,
            message: '',
            "token": {
                "name": decoded.name,
                "iat": decoded.iat,
                "exp": decoded.exp,
                "token": token
            }
        });
    }
    else {
        res.status(200).json({
            success: false,
            message: 'Token Error',
            data: []
        });
    }
}

module.exports = {
    Login: Login,
    RefreshToken : RefreshToken
};
