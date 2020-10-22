import * as mongoose from 'mongoose';

let ObjectID = mongoose.Schema.Types.ObjectID;

export const PersonSchema = new mongoose.Schema({
  id: ObjectID,
  passwordHash: String,
  email: {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }
  },
  firstName: String,
  lastName: String,
  role: String,
  band: {
    name: String
  },
  contact: [{
    type: String,
    value: String
  }],
  rating: [{
    rating: Number,
    message: String
  }],
  org_info: {
    organisation: {
      type: ObjectID,
      ref: 'organisations'
    },
    preferences: Number,
  },
  user_info: {
    type: ObjectID,
    ref: 'users'
  },
  agency_info: {
    agency: {
      type: ObjectID,
      ref: 'agencies'
    },
    userStorage: [{
      type: ObjectID,
      ref: 'agencies'
    }],
    preferences: {
      type: ObjectID,
      ref: 'preferences'
    }
  },
  admin_info: {
    preferences: {
      type: ObjectID,
      ref: 'preferences'
    }
  }
});

PersonSchema.set('validateBeforeSave', false);