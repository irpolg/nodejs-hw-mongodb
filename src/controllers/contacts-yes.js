//пакет http - error - для зручного створення помилок
//Інсталюємо його командою: npm install http-errors
import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContactFavourite,
  //   patchContactPhone,
} from '../services/contacts.js';

//10-08-2024 del-  import { contactSchema } from '../validation/contacts.js'; //hw-4  08-08-2024

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.send({ status: 200, data: contacts });
};

export const getIdContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  //console.log('req.body >>', req.body);
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavorite: req.body.isFavorite,
    contactType: req.body.contactType,
  }; //hw-4 закрила 08-08-2024 і 10-08-2024 відкрила
  // contactSchema.validate(contact);   //hw-4  08-08-2024

  //10-08 del- const result = contactSchema.validate(req.body, { abortEarly: false }); //hw-4  08-08-2024
  //10-08 del- console.log('result = contactSchema.validate>>', result); //hw-4  08-08-2024
  //умову перенесли в middleware/validatebody.js

  //   const newContact = await createContact(req.body); 10-08-2024
  //const newContact = await createContact(result.value); 10-08-2024 закрила

  const newContact = await createContact(contact); //10-08-2024
  // res.status(201).json({
  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact, // дані створеного контакту
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId);
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  //res.status(204).end();
  res.sendStatus(204);
};

//конспект
// export const patchContactPhoneController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const { phone } = req.body; //new 10-08
//   // 10-08 close  const patchContact = await patchContactPhone(contactId, req.body);
//   const patchContact = await patchContactPhone(contactId, phone);

//   if (!patchContact) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   res.json({
//     status: 200,
//     message: `Successfully patched a contact!`,
//     data: patchContact.contact,
//   });
// };
export const patchContactFavouriteController = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body; //new 10-08
  // 10-08 close  const patchContact = await patchContactPhone(contactId, req.body);
  const patchContact = await patchContactFavourite(contactId, favorite);

  if (!patchContact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: patchContact.contact,
  });
};

//вебінар 07-08-2024
// export async function changeStudentDutyController(req, res, next) {
//   const { id } = req.params;
//   const { duty } = req.body;

//   const updatedStudent = await changeStudentDuty(id, duty);

//   if (updatedStudent === null) {
//     return next(createHttpError.NotFound('Student not found'));
//   }

//   res.send({
//     status: 200,
//     message: 'Student duty updated',
//     data: updatedStudent,
//   });
// }

//Виклик next передає керування до наступного middleware
//в ланцюжку обробки запитів, але код в тілі самого
//контролера все ще виконається.Тому, після виклику next
//обов’язково потрібно додати return, щоб у разі помилки
//припинити виконання подальшого коду у контролері.
//Частою помилкою початківця
//є забувати додавати return в таких випадках.
