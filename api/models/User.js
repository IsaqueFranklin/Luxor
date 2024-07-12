const mongoose = require('mongoose');
const {Schema} = mongoose;

const quizDataSchema = new Schema({
    quizId: {
      type: {type: mongoose.Schema.Types.ObjectId, ref:'Conteudo'},
      required: true
    },
    quizScore: {
      type: String,
      required: true
    },
});

const UserSchema = new Schema({
    name: String,
    username: {type:String, unique:true},
    email: {type:String, unique:true},
    admin: {type:Boolean, default:false},
    profileImg: [String],
    password: String,
    fullUser: {type: Boolean, default: true},
    completedContents: [{type: mongoose.Schema.Types.ObjectId, ref:'Conteudo'}],
    completedModules: [{type: mongoose.Schema.Types.ObjectId, ref:'Book'}],
    quizzScores: [quizDataSchema],
    totalScore: String,
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;