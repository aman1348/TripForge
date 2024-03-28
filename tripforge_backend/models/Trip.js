const mongoose = require('mongoose');
const {Schema} = mongoose;

const tripSchema = new Schema({
    title : {type : String, required : true},
    description : {type : String},
    startDate : {type : Date},
    endDate : {type : Date}
})

const virtual = tripSchema.virtual('id');
virtual.get(function(){
    return this._id;
})

tripSchema.set('toJSON', {
    virtuals : true,
    versionKey : false,
    transform : function (doc, ret) {delete ret._id}
})

exports.Trip = mongoose.model('Trip',tripSchema)