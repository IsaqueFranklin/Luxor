const mongoose = require('mongoose');
const {Schema} = mongoose;

const GroupSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    tag: String,
    dia: Date,
    index: Number,
})

const GroupModel = mongoose.model('Group', GroupSchema);

module.exports = GroupModel;