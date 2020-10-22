import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const SpecialitySchema = new mongoose.Schema({
  id: ObjectID,
  doctor: [String],
  nurse: [String],
  organisation: [String]
});
