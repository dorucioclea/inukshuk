var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var findOrCreate = require('mongoose-findorcreate');
var validator = require('validator');


var connection = mongoose.createConnection('mongodb://localhost/inukshukdatabase');

//This is to make IDs start at 0 and increment
//when new trip created...good for MVP but perhaps good
//idea to revert to original IDs if we go to prod
autoIncrement.initialize(connection);

var LOCALE = 'en-CA';
//Helper to validate phones
var validatePhone = function(phoneNumber) {
  return validator.isMobilePhone(phoneNumber, LOCALE);
}

var tripSchema = new Schema({
  userId: { type: Number, ref: 'User', required: true},
  returnTime: { type: Date, required: true },
  contactEmail: { type: String,
                  trim: true,
                  validate: [validator.isEmail, 'Enter valid email']
                },
  contactPhone: { type: String,
                  trim: true,
                  validate :[validatePhone, 'Bad phoneNumber']
                },
  startingLocation: {
    type: { type: String }, //Latitude always goes first!
    coordinates: [Number]
  },
  note: {type: String},
  created_at: Date,
  updated_at: Date
});

tripSchema.pre('save', function(next){
  //Get the current Date
  var currentDate = new Date();

  //Changed the updated_at field
  this.updated_at = currentDate;

  //if created_at doesnt exist, start it!
  if(!this.created_at) {
    this.created_at = currentDate;
  }
  next();
});


tripSchema.plugin(autoIncrement.plugin, 'Trip');
tripSchema.plugin(findOrCreate);
var Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;