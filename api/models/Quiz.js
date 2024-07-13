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
    correctOption: {
      type: String,
      required: true
    }
});

const QuizSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    howManyQuestions: String,
    questions: {
      type: [questionSchema],
      required: true,
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conteudo'
    },
    created: Date,
    modific: Date,
});

const QuizModel = mongoose.model('Quiz', QuizSchema);

module.exports = QuizModel;