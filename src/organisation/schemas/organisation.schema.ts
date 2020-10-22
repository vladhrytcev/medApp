import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const OrganisationSchema = new mongoose.Schema({
  id: ObjectID,
  name: String,
  creatorId: String,
  address: String,
  postcode: String,
  city: String,
  country: String,
  url: String,
  logo: {
    data: Buffer,
    contentType: String,
  },
  pics: [String],
  departments: [{
    type: ObjectID,
    ref: 'departments'
  }],
  contacts: [{
    type: ObjectID,
    ref: 'person'
  }]
});