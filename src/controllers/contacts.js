import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContactFavourite,
} from '../services/contacts.js';

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
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };
  // isFavorite: req.body.isFavorite, //11-08-2024

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

export const patchContactFavouriteController = async (req, res, next) => {
  const { contactId } = req.params;
  const { favourite } = req.body;
  //   const { favorite } = req.body; //11-08-2024

  //const patchContact = await patchContactFavourite(contactId, favorite); 11-08-2024
  const patchContact = await patchContactFavourite(contactId, favourite);
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

//Виклик next передає керування до наступного middleware
//в ланцюжку обробки запитів, але код в тілі самого
//контролера все ще виконається.Тому, після виклику next
//обов’язково потрібно додати return, щоб у разі помилки
//припинити виконання подальшого коду у контролері.
//Частою помилкою початківця
//є забувати додавати return в таких випадках.
