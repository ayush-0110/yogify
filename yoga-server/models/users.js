const mongoose = require('mongoose');


const registrationSchema = new mongoose.Schema({
    month: Number,
    year: Number,
    timeSlot: String,
    batchChanged: { type: Boolean, default: false }
  });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true, unique: true },
  registrations: [registrationSchema]
});

module.exports = mongoose.model('User', userSchema);
