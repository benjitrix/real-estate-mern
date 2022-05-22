const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EstateTypeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide estate type name']
  }
})

module.exports = mongoose.model('EstateType', EstateTypeSchema)