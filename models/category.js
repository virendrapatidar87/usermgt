const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({

    name: { type: String },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
    status: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdDate: { type: String }
    
}, { toJSON: {virtuals:true} ,versionKey: false });

/* CategorySchema.virtual('parentProject', {
    ref: 'project', // The model to use
    localField: 'projectId', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
   // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  }); */

module.exports = mongoose.model('category', CategorySchema, 'category'); 
