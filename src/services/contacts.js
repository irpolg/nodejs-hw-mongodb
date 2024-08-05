import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

//вебінар-2 мод3
// export const createContact = (contactData) =>
//   ContactsCollection.create(contactData);

//конспект
export const createContact = async (payload) => {
  return await ContactsCollection.create(payload);
};

export const deleteContact = async (contactId) => {
  //console.log(contactId);
  const contact = await ContactsCollection.findByIdAndDelete(contactId);
  //console.log(contact);
  return contact;
};

//конспект
export const patchContactPhone = async (contactId, payload, options = {}) => {
  const patchContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );
  if (!patchContact || !patchContact.value) return null;
  return {
    contact: patchContact.value,
  };
};

//вебінар-2 yes - no change phone in Database
//
// export function patchContact(contactId, payload) {
//   return ContactsCollection.findByIdAndUpdate(contactId, payload, {
//     new: true,
//     upsert: true,
//     includeResultMetadata: true,
//   });
// }
//
// export const patchContactPhone = async (contactId, phone) => {
//   const patchContact = await ContactsCollection.findByIdAndUpdate(
//     contactId,
//     { phoneNumber: phone },
//     { new: true },
//   );
//   return patchContact;
// };
