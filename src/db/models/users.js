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

export const User = model('User', userSchema);
//export const UsersCollection = model('user', userSchema);
//прийнято, що назва схеми userSchema - однина!!!