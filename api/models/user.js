const mongoose = require('mongoose');
// const validators = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require('./profile');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        userName: {
            type: String,
            trim: true,
            maxLength: 15,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmPassword: {
            type: String,
            required: true,
        },
        profile: {
            type: Schema.Types.ObjectId,
            ref: Profile,
        },
        profilePics: {
            type: String,
            default: '/uploads/profilePics/default.png',
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
    }
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getAuthToken = async function (next) {
    try {
        const token = await jwt.sign({ _id: this._id }, process.env.SECRET, {
            expiresIn: '2h',
        });
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (e) {
        next(e);
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
