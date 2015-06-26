var mongoose = require('mongoose');

var Desserts = new mongoose.Schema({
  name: { type: String, require: true, },
  nameToLower: { type: String, lowercase: true },
  serving: { type: String, default: "100g" },
  calories: {
    unit: { type: String, default: "Cal" },
    value: { type: Number, require: true }
  },
  fat: {
    unit: { type: String, default: "g" },
    value: { type: Number, require: true }
  },
  carbs: {
    unit: { type: String, default: "g" },
    value: { type: Number, require: true }
  },
  protein: {
    unit: { type: String, default: "g" },
    value: { type: Number, require: true }
  },
  sodium: {
    unit: { type: String, default: "mg" },
    value: { type: Number, require: true }
  },
  calcium: {
    unit: { type: String, default: "%" },
    value: { type: Number, require: true }
  },
  iron: {
    unit:{ type: String, default: "%" },
    value: { type: Number, require: true }
  }
});

module.exports = mongoose.model('Desserts', Desserts, 'desserts');