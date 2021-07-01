const mongoose = require('mongoose');

// const User = require('./user');
// const Post = require('./post');

const { Schema } = mongoose;

const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            trim: true,
            maxLength: 50,
            required: true,
        },
        title: {
            type: String,
            trim: true,
            maxLength: 100,
            required: true,
        },
        bio: {
            type: String,
            trim: true,
            maxLength: 500,
            required: true,
        },
        profilePics: String,
        links: {
            website: String,
            facebook: String,
            twitter: String,
            github: String,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
