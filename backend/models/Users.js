const mongoose                  = require('mongoose');
const crypto                    = require('crypto');


const {Schema} = mongoose;

const schema = new Schema({
    _id: Schema.Types.ObjectId,
    login: {
        type: String,
        unique: true
    },
    password: String,
});

schema.statics.insert = function (data) {
    let Model = this;

    let instance = new Model({
        _id: new mongoose.Types.ObjectId(),
        login: data.login,
        password: crypto.createHash('md5').update(data.password).digest("hex")
    });

    return new Promise((resolve, reject)=>{
        instance.save((error, responseData) => {
            if(error) { reject(error); }
            resolve(responseData);
        });
    });
};


module.exports = mongoose.model('Users', schema);
