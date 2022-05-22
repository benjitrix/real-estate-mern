const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EstateTypeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'please provide estate type']
  }
})


const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true,  'Please provide category name']
  },
  estateType: [EstateTypeSchema]
})

module.exports = mongoose.model('Category', CategorySchema)