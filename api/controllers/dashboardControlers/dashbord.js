const { validationResult } = require('express-validator');
const Profile = require('../../models/profile');
const User = require('../../models/user');
const { errorFormetter } = require('./profileValidation');

const controllers = {};

controllers.getDashbord = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        // console.log(profile);
        if (profile) {
            return res.render('pages/dashbord/dashbord', {
                page_name: 'dashbord',
            });
        }
        res.redirect('/api/dashbord/create-profile');
    } catch (e) {
        next(e);
    }
};

controllers.getCreateProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        // console.log(profile);
        if (profile) {
            return res.redirect('/api/dashbord/edit-profile');
        }
        res.render('pages/dashbord/create-profile', {
            error: {},
            value: {},
            page_name: 'create-profile',
        });
    } catch (e) {
        next(e);
    }
};

controllers.postCreateProfile = async (req, res, next) => {
    const { name, title, bio, website, facebook, twitter, github 
} = req.body;

    const errors = validationResult(req).formatWith(errorFormetter);
    if (!errors.isEmpty()) {
        return res.render('pages/dashbord/create-profile', {
            error: errors.mapped(),
            value: {
                name,
                title,
                bio,
                website,
                facebook,
                twitter,
                github,
            },
        });
    }

    try {
        const profile = new Profile({
            user: req.user._id,
            name,
            title,
            bio,
            profilePics: req.user.profilePics,
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || '',
            },
            posts: [],
            bookmarks: [],
        });

        const createProfile = await profile.save();
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: { profile: createProfile._id } },
            { new: true },
        );
        res.redirect('/api/dashbord/');
    } catch (e) {
        next(e);
    }
};

controllers.getEditProfile = async (req, res, next) => {
    try {
        const profile = await Profile.findOne({ user: req.user._id });
        // console.log(profile);
        if (!profile) {
            return res.redirect('/api/dashbord/create-profile');
        }
        res.render('pages/dashbord/edit-profile', {
            error: {},
            profile,
            page_name: 'edit-profile',
        });
    } catch (e) {
        next(e);
    }
};

controllers.postEditProfile = async (req, res, next) => {
    const { name, title, bio, website, facebook, twitter, github 
} = req.body;

    const errors = validationResult(req).formatWith(errorFormetter);
    if (!errors.isEmpty()) {
        return res.render('pages/dashbord/edit-profile', {
            error: errors.mapped(),
            profile: {
                name,
                title,
                bio,
                links: {
                    website,
                    facebook,
                    twitter,
                    github,
                },
            },
            page_name: 'edit-profile',
        });
    }

    try {
        const profile = {
            name,
            title,
            bio,
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || '',
            },
        };

        const updateProfile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profile },
            { new: true },
        );

        res.render('pages/dashbord/edit-profile', {
            error: {},
            profile: updateProfile,
            page_name: 'edit-profile',
        });
    } catch (e) {
        next(e);
    }
};

module.exports = controllers;
