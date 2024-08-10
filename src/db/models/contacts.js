import { model, Schema } from 'mongoose';
//import mongoose from 'mongoose';

//const contactsSchema = new Schema(   10-08-2024 міняю назву const contactSchema !!!
//міняю contactSchema  а не contactsSchema - однина!!!
//const contactsSchema = new mongoose.Schema(
const contactSchema = new Schema(
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
    versionKey: false,
  },
);
//міняю contactSchema  а не contactsSchema - однина!!! 10-08-2024
export const ContactsCollection = model('contact', contactSchema); //10-08-2024
//const ContactsCollection = mongoose.model('contact', contactsSchema);
//export { ContactsCollection };
