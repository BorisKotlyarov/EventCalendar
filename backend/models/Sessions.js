const mongoose                  = require('mongoose');
const crypto                    = require('crypto');


const {Schema} = mongoose;

const schema = new Schema({
    token: String,
    state: {
        type: String,
        enum: ['active', 'close'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

schema.statics.insert = function (userId) {
    let Model = this;

    let token = crypto.createHash('md5').update(`${userId}:${new Date().getTime()}`).digest("hex");

    let instance = new Model({
        token,
        state: 'active',
        user: userId
    });

    return new Promise((resolve, reject)=>{
        instance.save((error, responseData) => {
            if(error) { reject(error); }
            resolve(responseData);
        });
    });
};

schema.statics.byToken = function (token) {
    return new Promise((resolve, reject) => {
        this.findOne({token}, (error, session) => {
            if (error) {
                reject(error);
            }
            resolve(session);
        });
    });
};

module.exports = mongoose.model('Sessions', schema);
