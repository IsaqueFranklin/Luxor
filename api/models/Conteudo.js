const mongoose = require('mongoose');
const {Schema} = mongoose;

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
    comments: [String],
    index: Number,
    quizId: {type: mongoose.Schema.Types.ObjectId, ref:'Quiz'},
    conjunto: {type: mongoose.Schema.Types.ObjectId, ref:'Book'},
})


const ConteudoModel = mongoose.model('Conteudo', ConteudoSchema);

module.exports = ConteudoModel;