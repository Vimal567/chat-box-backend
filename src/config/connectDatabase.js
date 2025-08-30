const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log('MongoDb connected!');
    })
};

module.exports = connectDatabase;