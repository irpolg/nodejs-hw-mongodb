import { Router } from 'express';
import {
  getAllContactsController,
  getIdContactController,
  createContactController,
  deleteContactController,
  patchContactPhoneController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getIdContactController));

router.post('/contacts', ctrlWrapper(createContactController));

// конспект
router.patch('/contacts/:contactId', ctrlWrapper(patchContactPhoneController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;

//router.put('/contacts/:contactId', ctrlWrapper(updateContactController));

//вебінар 2 - no change phone in Database
//import express from 'express';
//const router = express.Router();
//const jsonParser = express.json();
// router.patch(
//   '/contacts/:contactId/phone',
//   jsonParser,
//   ctrlWrapper(patchContactPhoneController),
// );
