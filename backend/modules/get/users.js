const Users = require('../../models/Users');


function removePassword(users){
    let result = [];
    users.forEach((user)=>{
        result.push({
            _id: user._id,
            login: user.login,
        });
    });

    return result;
}

module.exports = (request, response)=>{
    Users.find({}, (error, result)=>{
        response.json(removePassword(result));
    });
}
