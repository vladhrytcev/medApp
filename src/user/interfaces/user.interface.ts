import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly id: mongoose.Schema.Types.ObjectID;
  readonly person: string;
  readonly address: string;
  readonly postcode: string;
  readonly city: string;
  readonly dob: string;
  readonly extern_search: boolean;
  readonly bankdetails: string;
  readonly qualifications: {
    level: string,
    primary_field: {
      document_id: string;
      verified: boolean;
    };
    additional_fields: {
      document_id: string;
      virified: boolean;
    }[];
    associations: {
      association_id: string;
      document_id: string;
      verified: boolean;
    }[];
  }
  readonly jobs: {
    title: string;
    startdate: string;
    enddate: string;
    location: string;
  }[];
  readonly education: {
    university: {
      name: string;
      postcode: string;
      city: string;
      country: string;
    }[];
    startdate: string;
    enddate: string;
    qual_level: string;
    doc: string
  }[]
  readonly documents: string[];
  readonly skills: string[];
  readonly preferences: string;
  readonly creator: string;
};
