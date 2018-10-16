const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const UserTargetSchema = new Schema({

    target: { type: Number },
    achiveTarget: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'usermgt' },
    createdDate: { type: String },
    targetAchivedDate: { type: String }

}, {toJSON: { virtuals: true } , versionKey: false });


module.exports = mongoose.model('usertarget', UserTargetSchema, 'usertarget'); 
