const mongoose = require('mongoose');
const {Schema} = mongoose;

const AnswerSchema =  new Schema ({
    answerUserId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    answerBody: {type: String, required: true},
    answerTimestamp: {type: Date},
})

const CommentSchema = new Schema ({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    body: {type: String, required: true},
    timestamp: {type: Date},
    answers: [AnswerSchema]
})

const ConteudoSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    description: String,
    content: String,
    photos: [String],
    videoUrl: String,
    pdfUrl: [String], //Link do vídeo do youtube para embed
    dia: Date,
    modific: Date,
    comments: [CommentSchema],
    index: Number,
    quizId: {type: mongoose.Schema.Types.ObjectId, ref:'Quiz'},
    conjunto: {type: mongoose.Schema.Types.ObjectId, ref:'Book'},
})


const ConteudoModel = mongoose.model('Conteudo', ConteudoSchema);

module.exports = ConteudoModel;