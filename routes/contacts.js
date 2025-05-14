const express = require("express");
const router = express.Router();
const Contact = require("../models/contact"); // Import Contact model

// GET all contacts
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();
        if (contacts.length === 0) {
            return res.status(404).json({ message: "No contacts found" });
        }
        console.log("✅ Contacts fetched:", contacts); // Debugging log
        res.json(contacts);
    } catch (err) {
        console.error("❌ Error retrieving contacts:", err); // Improved error logging
        res.status(500).json({ message: "Error retrieving contacts" });
    }
});

// GET a single contact by ID
router.get("/:id", async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            console.warn(`⚠️ Contact with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log("✅ Contact found:", contact); // Debugging log
        res.json(contact);
    } catch (err) {
        console.error("❌ Error retrieving contact:", err);
        res.status(500).json({ message: "Error retrieving contact" });
    }
});

module.exports = router;
