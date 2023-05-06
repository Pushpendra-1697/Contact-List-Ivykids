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
    let { q, page = 1, limit = 5 } = req.query;

    try {
        if (q) {
            let contacts = await ContactModel.find({ name: { $regex: `${q}`, $options: "six" }, admin_id: user_id });
            res.status(200).send(contacts);
        } else if (page) {
            if (Number(page) === 1) {
                let contacts = await ContactModel.find({ admin_id: user_id }).skip(0).limit(+limit);
                res.status(200).send(contacts);
            } else {
                let s = Number(page) * Number(limit) - Number(limit);
                let contacts = await ContactModel.find({ admin_id: user_id }).skip(s).limit(+limit);
                res.status(200).send(contacts);
            }
        } else {
            const contacts = await ContactModel.find({ admin_id: user_id });
            res.status(200).send(contacts);
        }
    } catch (err) {
        res.status(404).send({ Error: err.message });
    }
});


// end point: /contact/patch/:id --> For update contact details;
contactRouter.patch('/patch/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    let arr = Object.keys(payload).filter(key => payload[key] !== "");
    let temp = {};
    for (let ele of arr) {
        temp[ele] = payload[ele];
    }

    try {
        await ContactModel.findByIdAndUpdate({ _id: id }, temp);
        let contact = await ContactModel.findOne({ _id: id });
        res.status(200).send(contact);
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

// end point: /contact/delete/:id --> For delete contact by id;
contactRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let contact = await ContactModel.findByIdAndDelete({ _id: id });
        res.send(contact);
    } catch (err) {
        console.log(err);
        res.status(404).send({ Error: err.message });
    }
});

module.exports = { contactRouter };