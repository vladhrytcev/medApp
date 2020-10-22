import { Document, ObjectID } from 'mongoose';

export interface Applicant extends Document {
  readonly id: ObjectID;
  readonly job_id: {
    type: ObjectID,
    ref: string
  };
  readonly location: {
    type: ObjectID,
    ref: string
  };
  readonly state: string;
  readonly user: {
    firstName: string,
    lastName: string,
    email: string,
    user_info: {
      qualification: {
        level: string
      }
    }
  };
  readonly agency: {
    type: ObjectID,
    ref: string
  };
};
