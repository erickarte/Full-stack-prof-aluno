const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const profSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, enum: ['prof', 'aluno'], required: true }
});

// Middleware para criptografar senha antes de salvar
profSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Prof = mongoose.model('Prof', profSchema);

module.exports = Prof;
