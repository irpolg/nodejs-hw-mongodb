import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (id) => ContactsCollection.findById(id);

// export const getAllContacts = async () => {
//   return await ContactsCollection.find();
// };

// export const getContactById = async (id) => {
//   return await ContactsCollection.findById(id);
// };
