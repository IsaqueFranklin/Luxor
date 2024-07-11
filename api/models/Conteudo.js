const mongoose = require('mongoose');
const {Schema} = mongoose;

const questionSchema = new Schema({
    statement: {
      type: String,
      required: true
    },
    options: [{
      type: String,
      required: true
    }],
    correctAnswer: {
      type: String,
      required: true
    }
});

const quizSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    questions: {
      type: [questionSchema],
      required: true,
    }
});

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
    coments: [String],
    index: Number,
    quiz: quizSchema,
    conjunto: {type: mongoose.Schema.Types.ObjectId, ref:'Book'},
})


const ConteudoModel = mongoose.model('Conteudo', ConteudoSchema);

module.exports = ConteudoModel;