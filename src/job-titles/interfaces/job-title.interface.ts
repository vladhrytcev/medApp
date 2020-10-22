import * as mongoose from 'mongoose';

export interface JobTitle extends mongoose.Document {
  readonly id: mongoose.Schema.Types.ObjectID;
  readonly doctors: {
    de: {
      id: mongoose.Schema.Types.ObjectID;
      active: string[];
      value: string;
    }[];
    en: {
      id: mongoose.Schema.Types.ObjectID;
      active: string[];
      value: string;
    }[];
  };
  readonly nurses: {
    de: {
      id: mongoose.Schema.Types.ObjectID;
      active: string[];
      value: string;
    }[];
    en: {
      id: mongoose.Schema.Types.ObjectID;
      active: string[];
      value: string;
    }[];
  }
}