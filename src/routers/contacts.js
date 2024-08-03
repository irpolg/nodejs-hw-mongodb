import { Router } from 'express';
//import express from 'express';
import {
  getAllContactsController,
  getIdContactController,
  createContactController,
  deleteContactController,
  updateContactController,
  changeContactNumberController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

//const router = express.Router();
//const router = Router();
const router = Router();
//const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getIdContactController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.put('/contacts/:contactId', ctrlWrapper(updateContactController));

router.patch(
  '/contacts/:contactId/phoneNumber',
  ctrlWrapper(changeContactNumberController),
);

export default router;
