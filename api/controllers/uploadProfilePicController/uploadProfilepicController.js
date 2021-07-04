const fs = require('fs');
const User = require('../../models/user');
const Profile = require('../../models/profile');

const controllers = {};

controllers.uploadProfilePics = async (req, res, next) => {
    if (req.file) {
        try {
            const profile = await Profile.findOne({ user: req.user._id });
            const profilePics = `/uploads/profilePics/${req.file.filename}`;

            if (profile) {
                await Profile.findOneAndUpdate(
                    { user: req.user._id },
                    { $set: { profilePics } },
                    { new: true }
                );

                await User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $set: { profilePics } },
                    { new: true }
                );

                res.redirect('/api/dashbord/edit-profile');
            } else {
                await User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $set: { profilePics } },
                    { new: true }
                );

                res.redirect('/api/dashbord/create-profile');
            }
        } catch (e) {
            res.status(501).json({ profilePics: req.user.profilePics });
        }
    } else {
        res.status(500).json({ profilePics: req.user.profilePics });
    }
};

controllers.removeProfilePics = (req, res, next) => {
    try {
        const defaultProfilePic = '/uploads/profilePics/default.png';
        const currentProfilePic = req.user.profilePics;

        fs.unlink(`public${currentProfilePic}`, async (err) => {
            const profile = await Profile.findOne({ user: req.user._id });

            if (profile) {
                await Profile.findOneAndUpdate(
                    { user: req.user._id },
                    { $set: { profilePics: defaultProfilePic } },
                    { new: true }
                );

                await User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $set: { profilePics: defaultProfilePic } },
                    { new: true }
                );

                res.redirect('/api/dashbord/edit-profile');
            } else {
                await User.findOneAndUpdate(
                    { _id: req.user._id },
                    { $set: { profilePics: defaultProfilePic } },
                    { new: true }
                );

                res.redirect('/api/dashbord/create-profile');
            }
        });
    } catch (e) {
        res.status(500).json({ profilePics: req.user.profilePics });
    }
};

controllers.postImageController = (req, res, next) => {
    if (req.file) {
        return res.status(200).json({
            imgUrl: `/uploads/postImage/${req.file.filename}`,
        });
    }
    return res.status(500).json({
        message: 'Server Error',
    });
};

module.exports = controllers;
