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
            return Schedules.byUser(user._id);
        })
        .then((schedules) => {
            response.json(schedules);
        });
};
