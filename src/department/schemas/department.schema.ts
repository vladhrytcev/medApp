import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const DepartmentSchema = new mongoose.Schema({
  id: String,
  org_id: {
    type: ObjectID,
    ref: 'organisations'
  },
  name: String,
  admins: [{
    type: ObjectID,
    ref: 'person'
  }],
  users: [{
    type: ObjectID,
    ref: 'person'
  }],
});