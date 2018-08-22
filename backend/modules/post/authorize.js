const crypto                    = require('crypto');
const Sessions                  = require('../../models/Sessions');
const Users                     = require('../../models/Users');


module.exports = (request, response)=> {

    request.body.password = crypto.createHash('md5').update(request.body.password).digest("hex");

    Users.findOne({
        login: request.body.login,
        password: request.body.password
    }, (error, user) => {

        if (null === user) {
            response.status(403).send({error: 403, message: 'Forbidden'});
            return;
        }

        Sessions.insert(user._id).then((session) => {
            response.json(session);
        });

    });

};
