const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const alternativeRoutes = require('./routes/alternativeRoutes');
const priceRoutes = require('./routes/priceRoutes');
const DDIRoutes = require('./routes/DDIRoutes');
const cartRoutes = require('./routes/cartRoutes');
const currentUser = require('./routes/currentUserRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', medicineRoutes);
app.use('/api', alternativeRoutes);
app.use('/api', priceRoutes);
app.use('/api', DDIRoutes);
app.use('/api', cartRoutes);
app.use('/api', currentUser);
app.use('/user', userRoutes);


// Connect to MongoDB
mongoose.connect('mongodb+srv://i210603:hamna123@medtrove.r56y0tg.mongodb.net/medTrove', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});    
