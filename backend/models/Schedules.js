const mongoose                  = require('mongoose');

const {Schema} = mongoose;

const schema = new Schema({
    date: Number,
    start: Number,
    duration: Number,
    title: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
});

schema.statics.insert = function (data) {
    let Model = this;

    let instance = new Model({
        date: data.date,
        start: data.start,
        duration: data.duration,
        title: data.title,
        user: data.user
    });

    return new Promise((resolve, reject) => {
        instance.save((error, responseData) => {
            if (error) {
                reject(error);
            }
            resolve(responseData);
        });
    });
};

schema.statics.byUser = function (userId) {
    return new Promise((resolve, reject) => {
        this.find({user: userId}, (error, responseData) => {
            if (error) {
                reject(error);
            }
            resolve(responseData);
        });
    });
}

module.exports = mongoose.model('Schedules', schema);
