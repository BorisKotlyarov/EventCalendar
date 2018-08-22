const Sessions                  = require('../../models/Sessions');


module.exports = (request, response)=> {
    Sessions.findOne({
        token: request.headers['access-token']
    }, (error, session) => {

        if (null === session) {
            response.status(403).send({error: 403, message: 'Forbidden'});
            return;
        }

        session.state = 'close';
        session.save();

        response.json(session);
    });

};
