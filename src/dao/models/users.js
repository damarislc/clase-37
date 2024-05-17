import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String, require: true },
  last_name: { type: String, require: true },
  email: { type: String, require: true },
  dni: { type: Number, require: true },
  password: { type: String, require: true },
  gender: { type: String, enum: ["M", "F", "Non-binary"] },
  role: { type: String, enum: ["Student", "Teacher"], default: "Student" },
  courses: {
    type: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Courses" }],
    default: [],
  },
});

export const userModel = mongoose.model(userCollection, userSchema);

export default userModel;
