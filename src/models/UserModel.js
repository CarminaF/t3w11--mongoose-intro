const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    }

});

UserSchema.pre(
    'save',
    async function(next) {
        console.log('About to save user to the DB');
        next();
    }
)

// const ModelName = mongoose.model('Name that appears in mongosh', SchemaModelBasedOn)
const User = mongoose.model('User', UserSchema)

module.exports = {
    User
}