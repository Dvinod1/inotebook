const mongoose = require('mongoose');
const {
   Schema
} = mongoose;




// eslint-disable-next-line no-undef
const UserSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   date: {
      type: Date,
      default: Date.now
   },

   password: {
      type: String,
      required: true,
   },

   email: {
      type: String,
      required: true,
      unique: true
   },


});

const User= mongoose.model('user', UserSchema);
module.exports =User