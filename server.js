const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("MongoDB Connection Error:", err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", userSchema);

// Validate Gmail Address
function isValidGmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

// Handle Form Submission
app.post("/submit", async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidGmail(email)) {
        return res.status(400).json({ message: "Invalid Gmail address! Please use a Gmail account." });
    }

    try {
        const user = new User({ name, email });
        await user.save();
        res.json({ message: "Login successful!" });
    } catch (error) {
        res.status(500).json({ message: "Database error" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
