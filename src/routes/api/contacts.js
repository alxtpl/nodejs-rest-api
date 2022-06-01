const express = require('express');

const {
  getContacts,
  getOneContact,
  deleteContact,
  addOneContact,
  updateOneContact,
  updateStatus,
} = require('../../controllers/contactsController');

const {
  addContactValidation,
  addStatusValidation,
} = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getOneContact);

router.delete('/:contactId', deleteContact);

router.post('/', addContactValidation, addOneContact);

router.put('/:contactId', addContactValidation, updateOneContact);

router.patch('/:contactId/favorite', addStatusValidation, updateStatus);

module.exports = router;
