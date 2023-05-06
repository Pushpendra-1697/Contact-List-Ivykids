const { Router } = require('express');
const ContactModel = require('../Models/contact.model');
const contactRouter = Router();

// end point: /contact/post --> For create a new contact;
contactRouter.post('/post', async (req, res) => {
    const { name, address, phone } = req.body;
    const { user_id } = req.headers;
    let payload = { name, address, phone, admin_id: user_id };
    try {
        const contact = new ContactModel(payload);
        await contact.save();
        res.status(201).send({ msg: 'Successfully Created an Contact', contact });
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});

//end point: /contact/get --> For get All contacts of particulat admin;
contactRouter.get('/get', async (req, res) => {
    const { user_id } = req.headers;
    
    try {
        const contacts = await ContactModel.find({ admin_id: user_id });
        res.status(200).send(contacts);
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
})

module.exports = { contactRouter };