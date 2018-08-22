const Users                     = require('../../models/Users');


module.exports = (request, response)=> {

    Users.insert({
        login: request.body.login,
        password: request.body.password
    }).then((data) => {
        response.json(data);
    }).catch((error) => {
        response.json(error);
    });

};
