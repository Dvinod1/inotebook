/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { Schema } = mongoose;


 
const NoteSchema = new Schema({
 
   date:{
    type:Date,
    default:Date.now
   },
  description:{
         type:String,
         required:true
  },
   tag:{
    type:String,
    default:'general'
   }, 
   
   tittle:{
    type:String,
    required:true
   }

  });

  module.exports=mongoose.model('notes',NoteSchema);
