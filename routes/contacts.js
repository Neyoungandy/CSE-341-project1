const express = require("express");
const router = express.Router();
const Contact = require("../models/contact"); // Import Contact model (which we'll create next)

// GET all contacts
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log("Contacts fetched:", contacts); // Debugging log
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving contacts" });
    }
});

// GET a single contact by ID
router.get("/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving contact" });
    }
});

module.exports = router;
