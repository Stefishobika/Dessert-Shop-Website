
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');




const app = express();




// Serve static files like HTML, CSS, images, etc.
app.use(express.static(__dirname));




// Middleware to parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/')




.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch(err => {
    console.error('❌ MongoDB connection error:', err);
});




// Define Schema and Model
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    people: String,
    message: String
});




const Booking = mongoose.model('Booking', bookingSchema);




// Serve your HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FILE1.html'));
});




// Handle booking submissions
app.post('/tasks', async (req, res) => {
    const { a: name, b: email, c: phone, d: date, e: time, f: people, g: message } = req.body;




    if (!name || !email) {
        return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }




    try {
        const newBooking = new Booking({ name, email, phone, date, time, people, message });
        const savedBooking = await newBooking.save();
        return res.status(201).json({
            success: true,
            message: 'Booking saved successfully',
            booking: savedBooking
        });
    } catch (error) {
        console.error('Error saving booking:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
});




// API to get all bookings
app.get('/api/tasks', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});




// Start the server
app.listen(4000, () => {
    console.log('🚀 Server running on http://localhost:4000');
});
