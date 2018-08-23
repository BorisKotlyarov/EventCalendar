const Users                     = require('../../models/Users');
const Schedules                 = require('../../models/Schedules');


module.exports = (request, response)=> {

    if (!request.headers['access-token']) {
        response.status(403).send({error: 403, message: 'Forbidden'});
        return;
    }

    Users.bySessionToken(request.headers['access-token'])
        .then((user) => {
            if (!user) {
                response.status(401).send({error: 401, message: 'Unauthorized'});
                return;
            }
            return user;
        })
        .then((user) => {
            let insertData = Object.assign({user: user._id}, request.body);
            return Schedules.insert(insertData);
        })
        .then((schedule) => {
            response.json(schedule);
        })
        .catch((error) => {
            response.status(400).send({error: 400, message: error});
        });
};
