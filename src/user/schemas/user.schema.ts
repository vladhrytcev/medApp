import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const UserSchema = new mongoose.Schema({
  id: ObjectID,
  person: {
    type: ObjectID,
    ref: 'person'
  },
  address: String,
  postcode: String,
  city: String,
  dob: Date,
  extern_search: Boolean,
  bankdetails: String,
  qualifications: {
    level: String,
    primary_field: {
      document_id: {
        type: ObjectID,
        ref: 'documents'
      },
      verified: Boolean
    },
    additional_fields: [{
      document_id: {
        type: ObjectID,
        ref: 'documents'
      },
      verified: Boolean
    }],
    associations: [{
      association_id: {
        type: ObjectID,
        ref: 'associations'
      },
      document_id: {
        type: ObjectID,
        ref: 'documents'
      },
      verified: Boolean
    }]
  },
  jobs: [{
    title: String,
    startdate: Date,
    enddate: Date,
    location: String,
  }],
  education: [{
    university: {
      name: String,
      postcode: String,
      city: String,
      country: String
    },
    startdate: Date,
    enddate: Date,
    qual_level: String,
    doc: {
      type: ObjectID,
      ref: 'documents'
    }
  }],
  documents: [{
    type: ObjectID,
    ref: 'documents'
  }],
  skills: [String],
  preferences: {
    type: ObjectID,
    ref: 'preferences'
  },
  creator: {
    type: ObjectID,
    ref: 'person'
  },
})
