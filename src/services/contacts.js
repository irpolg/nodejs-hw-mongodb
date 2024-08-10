import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

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

//вебінар-2
export function patchContactFavourite(contactId, favourite) {
  return ContactsCollection.findByIdAndUpdate(
    contactId,
    { isFavourite: favourite },
    { new: true },
  );
}

//конспект
// export const patchContactPhone = async (contactId, payload, options = {}) => {
// export const patchContactFavourite = async (
//   contactId,
//   payload,
//   options = {},
// ) => {
//   const patchContact = await ContactsCollection.findOneAndUpdate(
//     { _id: contactId },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );
//   if (!patchContact || !patchContact.value) return null;
//   return {
//     contact: patchContact.value,
//   };
// };
