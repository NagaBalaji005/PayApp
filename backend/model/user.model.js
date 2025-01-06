const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Define the schema for the user model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    upiId: { type: String, required: true, unique: true },  // Updated to match the lowercase convention
    balance: { type: Number, default: 0 }  // Default balance set to 0 if not provided
});

// Add method to generate authentication token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET);
    return token;
};

// Add method to compare passwords during login
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Static method to hash passwords before saving
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

// Create the model based on the schema
const userModel = mongoose.model('User', userSchema);  // Capitalized 'User' to follow naming conventions

module.exports = userModel;
