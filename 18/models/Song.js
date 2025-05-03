const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  songname: {
    type: String,
    required: true
  },
  film: {
    type: String,
    required: true
  },
  music_director: {
    type: String,
    required: true
  },
  singer: {
    type: String,
    required: true
  },
  actor: {
    type: String,
    default: ''
  },
  actress: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Song', songSchema);


