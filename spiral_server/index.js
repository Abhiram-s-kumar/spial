const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const Contact = require("./models/Contacct");

const app = express();
app.use(cors({
  origin: 'https://spialfrontend.vercel.app',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.static('public'));


app.use(express.json());

mongoose.connect("mongodb+srv://abhirambca2021:spiral@cluster0.efympxy.mongodb.net/spiralEd?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ Connected to MongoDB: spiralEd database"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// POST route to save contact info
app.post("/api/contact", async (req, res) => {
  const { name, number, email } = req.body;

  if (!name || !number || !email) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newContact = new Contact({ name, number, email });
    await newContact.save();
    res.status(201).json({ message: "✅ Contact saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({ message: "Server error." });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server is running on http://localhost:3001");
});


