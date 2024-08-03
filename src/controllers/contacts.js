// 02-08-2024
//Для зручного створення помилок скористаємось
//пакетом http - error
//Інсталюємо його командою: npm install http-errors
import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
  changeContactNumberPhone,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  const contacts = await getAllContacts();
  res.send({ status: 200, data: contacts });
};

export const getIdContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact === null) {
    // return next(createHttpError[404]("Contact not found"));
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

export async function deleteContactController(req, res, next) {
  const { contactId } = req.params;
  const deletedContact = await deleteContact(contactId);

  if (deletedContact === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }
  res.status(204).end();
}

export async function updateContactController(req, res, next) {
  const { contactId } = req.params;
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    contactType: req.body.contactType,
    email: req.body.email,
  };
  const updateResult = await updateContact(contactId, contact);

  if (updateResult.lastErrorObject.updatedExisting === true) {
    return res.send({
      status: 200,
      message: 'Contact updated',
      data: updateResult.value,
    });
  }

  res.status(201).send({
    status: 201,
    message: 'Contact created',
    data: updateResult.value,
  });
}

export async function changeContactNumberController(req, res, next) {
  const { contactId } = req.params;
  const { inputNumber } = req.body;
  const updatedContact = await changeContactNumberPhone(contactId, inputNumber);

  if (updatedContact === null) {
    return next(createHttpError.NotFound('Contact not found'));
  }
  res.send({
    status: 200,
    message: 'Contact duty updated',
    data: updatedContact,
  });
}

//Виклик next передає керування до наступного middleware
//в ланцюжку обробки запитів, але код в тілі самого
//контролера все ще виконається.Тому, після виклику next
//обов’язково потрібно додати return, щоб у разі помилки
//припинити виконання подальшого коду у контролері.
//Частою помилкою початківця
//є забувати додавати return в таких випадках.
