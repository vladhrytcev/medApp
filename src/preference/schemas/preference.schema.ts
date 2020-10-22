import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const PreferenceSchema = new mongoose.Schema({
  id: ObjectID,
  userPref: {
    distance: Number,
    field: {
      type: ObjectID,
      ref: 'person'
    },
    minSalary: Number,
    jobTypes: [String]
  },
  adminPref: {

  },
  agencyPref: {
    jobType: String,
    fields: [String],
    locations: [{
      type: ObjectID,
      ref: 'organisation'
    }],
    jobOperations: [String],
    acceptTnC: Boolean
  }
})
