//пакет http - error - для зручного створення помилок
//Інсталюємо його командою: npm install http-errors
import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  patchContactPhone,
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
  console.log(req.body);
  const newContact = await createContact(req.body);
  res.status(201).json({
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
export const patchContactPhoneController = async (req, res, next) => {
  const { contactId } = req.params;
  const patchContact = await patchContactPhone(contactId, req.body);

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
