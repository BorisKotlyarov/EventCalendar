const Users                     = require('../../models/Users');
const Schedules                 = require('../../models/Schedules');


module.exports = (request, response)=> {

    let scheduleId = request.params.scheduleId;

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
            return new Promise((resolve, reject) => {
                Schedules.findOne({_id: scheduleId, user: user._id}, (error, schedule) => {
                    if (error) {
                        reject(error);
                    }

                    if (!schedule) {
                        response.status(404).send({error: 404, message: 'Schedule doesn\'t exist'});
                        return;
                    }

                    schedule.remove();

                    resolve(schedule);
                });
            });
        })
        .then((schedule) => {
            response.json({message: `Schedule with id "${schedule._id}" has been removed`});
        })
        .catch((error) => {
            response.status(500).send({error: 500, message: error});
        });
};
