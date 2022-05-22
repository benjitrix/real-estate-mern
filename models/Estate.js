const mongoose = require('mongoose')

const EstateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide title']
  },
  category: {
    type: String,
    required: [true, 'Please provide category']
  },
  estateType: {
    type: String,
    required: [true, 'Please provide type']
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  location: {
    type: String,
    require: [true, 'Please provide location']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price']
  },
  contact: {
    type: String,
    require: [true, 'Please provide contact']
  },
  images: {
    type: [String],
    required: [true, 'Please provide image path']
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: String,
    require: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Estate', EstateSchema)