import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const AgencySchema = new mongoose.Schema({
  id: ObjectID,
  name: String,
  address: String,
  postcode: String,
  country: String,
  url: String,
  logo: String,
  contacts: [{
    type: ObjectID,
    ref: 'person'
  }],
  bankdetails: {
    type: ObjectID,
    ref: 'bankdetails'
  },
  userStorage: [{
    type: ObjectID,
    ref: 'person'
  }],
  creator: {
    type: ObjectID,
    ref: 'person'
  }
})
