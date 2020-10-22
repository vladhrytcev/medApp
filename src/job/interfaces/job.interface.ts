import { Document } from 'mongoose';
import { JobState } from '../../common/enums/job-state.enum';
import { JobType } from '../../common/enums/job-type.enum';

export interface Job extends Document {
  readonly jobID: string;
  readonly title: string;
  readonly desc: string;
  readonly skills: string[];
  readonly timeLimit: string[];
  readonly orig_submission: string[];
  readonly dates: {
    Type: string;
    date: {
      startDate: string;
      endDate: string;
      activity: string;
    }
  }[];
  readonly salary: {
    activity: string;
    cost: string;
  }[];
  readonly field: string;
  readonly orig_dept: string;
  readonly subtitle: string;
  readonly accomodation: boolean;
  readonly state: JobState;
  readonly applicants: {
    state: string;
    user: string;
  }[];
  readonly organisation: string;
  readonly jobType: JobType;
  readonly jobOperation: string;
  readonly external_adv: string;
  readonly payment: string;
}