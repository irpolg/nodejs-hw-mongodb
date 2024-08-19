import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model('user', userSchema); // 17-08 was model User
//export const UsersCollection = model('user', userSchema);
//прийнято, що назва схеми userSchema - однина!!!