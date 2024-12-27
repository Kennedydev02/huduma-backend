const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define Schema
const RegistrationSchema = new mongoose.Schema({
  // Personal Information
  fullName: String,
  dateOfBirth: String,
  gender: String,
  identificationNumber: String,
  
  // Contact Information
  phoneNumber: String,
  email: String,
  address: String,
  
  // Emergency Contact
  emergencyName: String,
  emergencyPhone: String,
  emergencyRelation: String,
  
  // Program
  preferredProgram: String,
  joiningDate: String,
  
  // Accommodation
  needsAccommodation: Boolean,
  checkInDate: String,
  
  // Airport Pickup
  needsAirportPickup: Boolean,
  arrivalDate: String,
  arrivalTime: String,
  
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Registration = mongoose.model('Registration', RegistrationSchema);

// Routes
app.post('/api/submit', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.get('/api/submissions', async (req, res) => {
  try {
    const submissions = await Registration.find().sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 