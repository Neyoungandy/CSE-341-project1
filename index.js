require("dotenv").config(); // Load .env file first

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Debugging: Print MONGO_URI to check if it's loading
console.log("Mongo URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is undefined. Check your .env file.");
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

// Middleware: Allow Express to parse JSON request bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
