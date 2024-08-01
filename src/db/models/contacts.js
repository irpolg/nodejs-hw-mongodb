import { model, Schema } from 'mongoose';
//import mongoose from 'mongoose';

const contactsSchema = new Schema(
  //const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
  },
  {
    timestamps: true,
    //versionKey: false,
  },
);

export const ContactsCollection = model('contact', contactsSchema);
//const ContactsCollection = mongoose.model('contact', contactsSchema);
//export { ContactsCollection };
