import { Schema, models, model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "Jess" },
    role: { type: String, default: "admin" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default models.User || model<IUser>("User", UserSchema);
