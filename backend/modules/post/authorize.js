const crypto                    = require('crypto');
const Sessions                  = require('../../models/Sessions');
const Users                     = require('../../models/Users');


module.exports = (request, response)=>{

    request.body.password = crypto.createHash('md5').update(request.body.password).digest("hex");

    Users.find({
        login: request.body.login,
        password: request.body.password
    }, (error, result)=> {

        if (0 == result.length) {
            response.status(403).send({error: 403, message: 'Forbidden'});
            return;
        }

        let user = result[0];

        Sessions.insert(user._id).then((session) => {
            response.json(session);
        });

    });

}
