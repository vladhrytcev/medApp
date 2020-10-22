import { Document, ObjectID } from 'mongoose';

export interface Preference extends Document {
  readonly id: ObjectID;
  readonly userPref: {
    distance: number;
    field: string;
    minSalary: number;
    jobTypes: string[];
  };
  readonly adminPref: {
    
  }
  readonly agencyPref: {
    jobType: number[];
    fields: number[];
    locations: string[];
    jobOperation: string[];
    acceptTnC: boolean;
  }
}
