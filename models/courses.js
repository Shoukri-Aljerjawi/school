const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const couresSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  addDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  courseAddingBy: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  status: {
    type: String,
    default: 'Waiting',
    required: true,
  },
  assignCourseTo: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
});

module.exports = mongoose.model('Coures', couresSchema);
