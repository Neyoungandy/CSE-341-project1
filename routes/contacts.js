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

// POST: Create a new contact
router.post("/", async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: "✅ Contact created successfully", contactId: contact._id });
    } catch (err) {
        console.error("❌ Error creating contact:", err);
        res.status(500).json({ message: "Error creating contact", error: err });
    }
});

// PUT: Update an existing contact by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) {
            console.warn(`⚠️ Contact with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log("✅ Contact updated:", updatedContact);
        res.status(200).json({ message: "✅ Contact updated successfully", updatedContact });
    } catch (err) {
        console.error("❌ Error updating contact:", err);
        res.status(500).json({ message: "Error updating contact", error: err });
    }
});

// DELETE: Remove a contact by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            console.warn(`⚠️ Contact with ID ${req.params.id} not found`);
            return res.status(404).json({ message: "Contact not found" });
        }
        console.log("✅ Contact deleted:", deletedContact);
        res.status(200).json({ message: "✅ Contact deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting contact:", err);
        res.status(500).json({ message: "Error deleting contact", error: err });
    }
});

module.exports = router;
