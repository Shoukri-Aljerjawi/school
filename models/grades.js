const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradesSchema = new Schema({
  idCourse: {
    type: Schema.Types.ObjectId,
    ref: 'Coures',
    required: true,
  },
  idStudent: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Grades', gradesSchema);
