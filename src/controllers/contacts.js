import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContact,
  //patchContactFavourite,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  //console.log(req.user); //5HW - 8krok 2вебінар мод5-1-18-29
  //const {id} = req.param; /5HW - 8krok 2вебінар мод5-1-19-05

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  parseSortParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });
  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getIdContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

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
  const newContact = await createContact({ ...req.body, userId: req.user._id });

  // res.status(201).json({
  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact, // дані створеного контакту
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId, req.user._id);
  if (!deletedContact) {
    throw createHttpError(404, 'Contact not found');
  }
  //res.status(204).end();
  res.sendStatus(204);
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  //const updateData = req.body;
  //const result = await patchContact(contactId, updateData);
  const result = await patchContact(contactId, req.body, req.user._id);
  console.log('result>>', result);
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: ' Successfully patched a contact!',
    data: result,
  });
};

//Виклик next передає керування до наступного middleware
//в ланцюжку обробки запитів, але код в тілі самого
//контролера все ще виконається.Тому, після виклику next
//обов’язково потрібно додати return, щоб у разі помилки
//припинити виконання подальшого коду у контролері.
//Частою помилкою початківця
//є забувати додавати return в таких випадках.

// favourite - patch цього поля обов'язковий
// export const patchContactFavouriteController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const { favourite } = req.body;
//   //   const { favorite } = req.body; //11-08-2024

//   //const patchContact = await patchContactFavourite(contactId, favorite); 11-08-2024
//   const patchContact = await patchContactFavourite(contactId, favourite);
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
