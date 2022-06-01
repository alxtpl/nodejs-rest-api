const { Contact } = require('../models/contact');

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find({});
  res.json({ contacts, status: 'succes' });
};

const getOneContact = async (req, res) => {
  const contactById = await Contact.findById(req.params.contactId);
  console.log('contactById:', contactById);
  if (!contactById) {
    console.log('contactById:', !contactById);

    res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
    console.warn('Contact not found');
    return;
  }
  res.json({ contactById, status: 'succes' });
};

const deleteContact = async (req, res, next) => {
  const removeById = await Contact.findByIdAndRemove(req.params.contactId);
  if (!removeById) {
    res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  }
  res.json({ removeById, status: 'succes' });
};

const addOneContact = async (req, res) => {
  const { name, email, phone, favorite } = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({
      status: 'error',
      message: 'missing required name field',
    });
    return;
  } else if (!favorite) {
    req.body.favorite = false;
  }
  console.log('req.body:', req.body);
  const newContent = await Contact.create(req.body);
  res.status(201).json({
    massage: newContent,
    status: 'succes',
  });
};
const updateOneContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const isId = await Contact.findById(req.params.contactId);
  if (!name && !email && !phone) {
    return res.status(400).json({
      status: 'error',
      message: 'missing fields',
    });
  } else if (!isId) {
    return res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  } else {
    const afterupdateContact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
      new: true,
    });

    res.status(200).json({
      message: afterupdateContact,
      status: 'succes',
    });
  }
};

const updateStatus = async (req, res, next) => {
  const { favorite } = req.body;
  const isId = await Contact.findById(req.params.contactId);
  if (!favorite) {
    return res.status(400).json({
      status: 'error',
      message: 'missing field favorite',
    });
  } else if (!isId) {
    return res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  } else {
    const afterupdateContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { favorite },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: afterupdateContact,
      status: 'succes',
    });
  }
};

module.exports = {
  getContacts,
  getOneContact,
  deleteContact,
  addOneContact,
  updateOneContact,
  updateStatus,
};
