// //02-08-2024
// import { Router } from 'express';
// //import { getAllStudents, getStudentById } from '../services/students.js';
// import { getAllContacts, getContactById } from '../services/contacts.js';
// //from './services/contacts.js'; чи з контролера як на початку вебінару 02-08-2024

// import {
//   getAllContactsController,
//   getIdContactController,
// } from '../controller/contacts.js';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// //const router = Router();
// const contactsRouter = Router();

// contactsRouter.get('/contacts', getIdContactController);
// // contactsRouter.get('/contacts', async (req, res) => {
// //   const contacts = await getAllContacts();

// //   res.status(200).json({
// //     data: contacts,
// //   });
// // });

// contactsRouter.get('/contacts/:contactId', getIdContactController);
// // contactsRouter.get('/contacts/:contactId', async (req, res, next) => {
// //   const { contactId } = req.params;
// //   const contact = await getContactById(contactId);

// //   // Відповідь, якщо контакт не знайдено
// //   if (!contact) {
// //     res.status(404).json({
// //    message: 'Contact not found'
// //     });
// //     return;
// //   }

// //   // Відповідь, якщо контакт знайдено
// //   res.status(200).json({
// //     data: contact,
// //   });
// // });

// export default contactsRouter;
