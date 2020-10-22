import { Document, ObjectID } from 'mongoose';

export interface Organisation extends Document {
  readonly id: ObjectID;
  readonly name: string;
  readonly creatorId: string | number;
  readonly address: string;
  readonly postcode: string;
  readonly city: string;
  readonly country: string;
  readonly url: string;
  readonly logo: string;
  readonly pics: string[];
  readonly departments: {
    name: string;
    ord_id: string;
    admin: string[];
    users: string[];
    defaultSkills: string[];
    metadata: string;
  }[];
};
