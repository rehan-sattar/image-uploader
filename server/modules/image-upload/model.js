const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageModal = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Image', imageModal);
