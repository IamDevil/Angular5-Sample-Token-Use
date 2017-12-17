const jwt = require('jsonwebtoken');
const postgres_db = require('./postgres');

/**GetMembers
*   Input
*  Ouput
*      Members
*/
async function GetMembers(req, res, next) {
    try{
        const posts = await postgres_db.any('select * from public."MemberList" where "parent_name" =  ${name} ORDER BY "ID"' , req.decoded);
        if(posts === null) {
            res.status(200).json({
                success: false,
                message: 'DB Error',
                data: []
            });
        }
        else {
            res.status(200).json({
                success: true,
                data: posts,
                message: ''
            });
        }
    }
    catch(err) {r);
        res.status(200).json({
            success: false,
            message: err,
            data: []
        });
    };
}

/**CreateMember
*   Input
*      name
*  Ouput
*/
async function CreateMember(req, res, next) {
    try{
        req.body.parent_name = req.decoded.name;
        const posts = await postgres_db.none('insert into public."MemberList" ("name", "parent_name")  VALUES  (${name}, ${parent_name})' , req.body );
        res.status(200).json({
            success: true,
            message: ''
        });
    }
    catch(err) {
        res.status(200).json({
            success: false,
            message: err
        });
    };
}

module.exports = {
    GetMembers: GetMembers,
    CreateMember: CreateMember
};
