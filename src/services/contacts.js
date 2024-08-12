import { ContactsCollection } from '../db/models/contacts.js';

//export const getAllContacts = ({ page, perPage }) => ContactsCollection.find();
export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  //filter,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const [contacts, count] = await Promise.all([
    // ContactsCollection.find().sort({ name: 1 }).skip(skip).limit(perPage),
    ContactsCollection.find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
    ContactsCollection.countDocuments(),
  ]);

  const totalPages = Math.ceil(count / perPage);

  return {
    contacts,
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
}

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
export function patchContact(contactId, updateData) {
  return ContactsCollection.findByIdAndUpdate(contactId, updateData, {
    new: true, //повертати оновлену версію документа
    runValidators: true, // та запускати валідатори
  });
}
// export function patchContactFavourite(contactId, updateData) {
//   return ContactsCollection.findByIdAndUpdate(contactId, updateData, {
//     new: true, //повертати оновлену версію документа
//     runValidators: true, // та запускати валідатори
//   });
// }

// export function patchContactFavourite(contactId, favourite) {
//   return ContactsCollection.findByIdAndUpdate(
//     contactId,
//     { isFavourite: favourite },
//     { new: true },
//   );
// }

//конспект
// export const patchContact = async (contactId, payload, options = {}) => {
//   const patchToContact = await ContactsCollection.findOneAndUpdate(
//     { _id: contactId },
//     payload,
//     {
//       new: true,
//       includeResultMetadata: true,
//       ...options,
//     },
//   );
//   if (!patchToContact || !patchToContact.value) return null;
//   return {
//     contact: patchToContact.value,
//   };
// };
