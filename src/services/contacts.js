import { ContactsCollection } from '../db/models/contacts.js';

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = (contactId) =>
  ContactsCollection.findById(contactId);

export const createContact = (contactData) =>
  ContactsCollection.create(contactData);

export function deleteContact(contactId) {
  //return ContactsCollection.findByIdAndDelete(contactId);
  return ContactsCollection.findByIdAndDelete({ _id: contactId });
}

export function updateContact(contactId, payload) {
  return ContactsCollection.findByIdAndUpdate(contactId, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });
}

export function changeContactNumberPhone(contactId, inputNumber) {
  return ContactsCollection.findByIdAndUpdate(
    contactId,
    { phoneNumber: inputNumber },
    { new: true },
  );
}

// export const getAllContacts = async () => {
//   return await ContactsCollection.find();
// };

// export const getContactById = async (id) => {
//   return await ContactsCollection.findById(id);
// };
