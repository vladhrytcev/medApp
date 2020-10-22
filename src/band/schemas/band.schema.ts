import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const BandSchema = new mongoose.Schema({
  id: ObjectID,
  name: String,
})
