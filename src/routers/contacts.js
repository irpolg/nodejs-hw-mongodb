//import { Router } from 'express';
import express from 'express';
import {
  getAllContactsController,
  getIdContactController,
  createContactController,
  deleteContactController,
  patchContactFavouriteController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  contactSchema,
  contactFavouriteSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middleware/isValidId.js';

// const router = Router();
const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  //isValidId('contactId'),
  ctrlWrapper(getIdContactController),
);

router.post(
  '/contacts',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);

// конспект
router.patch(
  '/contacts/:contactId/favourite',
  isValidId,
  //   isValidId('contactId'),
  jsonParser,
  validateBody(contactFavouriteSchema), //11-08-2024
  ctrlWrapper(patchContactFavouriteController),
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  //   isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default router;

//router.put('/contacts/:contactId', ctrlWrapper(updateContactController));
