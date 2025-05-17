require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose"); // Using Mongoose (Recommended)
const cors = require("cors"); // Import CORS middleware
const swaggerUi = require("swagger-ui-express"); // Swagger UI
const swaggerDocument = require("./swagger/swagger.json"); // Import Swagger Docs

const app = express();

// Debugging: Print MONGO_URI to check if it's loading
console.log("Mongo URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
    console.error("Error: MONGO_URI is undefined. Check your .env file.");
    process.exit(1);
}

// 🚀 Enable CORS to allow external requests (IMPORTANT for Render!)
app.use(cors({
    origin: "*", // Allow requests from anywhere
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow API methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allow necessary headers
}));

// Middleware: Allow Express to parse JSON request bodies
app.use(express.json());

// Connect to MongoDB (Using Mongoose)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

// 📌 Add Swagger API Documentation Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

// Import and Use Contacts Routes
const contactsRoutes = require("./routes/contacts");
app.use("/contacts", contactsRoutes);

// Basic route to confirm the server is running
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌍 Server running on port ${PORT}`);
});
