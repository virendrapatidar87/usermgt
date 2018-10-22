const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
     jwt = require('jsonwebtoken'),
      bcrypt = require('bcryptjs'),
      config = require('../config/config');
const TipsSchema = new Schema(
    {
   tipHeading: { type: String },
    tipText: { type: String},
    creditscoreRange: { type: String },
    minRange:{type:Number},
    maxRange:{type:Number},
    createdDate:{type: String },
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    status: { type: String },
 updatedDate:{ type: String }
}, {toJSON: { virtuals: true } , versionKey: false });


module.exports = mongoose.model('tips', TipsSchema, 'tips'); 