const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: String,
    username: {type:String, unique:true},
    email: {type:String, unique:true},
    admin: {type:Boolean, default:false},
    profileImg: [String],
    bio: String,
    instagram: String,
    password: String,
    fullUser: {type: Boolean, default: false},
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;