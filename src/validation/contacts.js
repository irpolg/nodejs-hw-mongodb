import Joi from 'joi';

export const contactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should be at least {#limit}',
    'string.max': 'Name should be at most {#limit}',
    'any.required': 'Name should be exists',
  }),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required(),
});

// див вебінар 07-08-2024  01-15-00
// export const contactFavouriteSchema = Joi.object({
//   favourite: Joi.boolean().required(),
// });

export const contactPatchSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  phoneNumber: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().min(3).max(20).optional(),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .optional(),
}).or('name', 'phoneNumber', 'email', 'isFavourite', 'contactType');
//метод .or для вказання того, що хоча б одне з полів
//('name', 'phoneNumber', 'email', 'isFavourite', 'contactType')
//повинно бути присутнім у даних для валідації.
