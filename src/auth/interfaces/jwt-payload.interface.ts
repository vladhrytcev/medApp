import { ObjectID } from "mongoose";

export interface JwtPayload {
  id: ObjectID;
  email: string;
}
