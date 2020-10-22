import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const UniversitySchema = new mongoose.Schema({
  id: ObjectID,
  name: String,
  postcode: String,
  city: String,
  country: String,
});
