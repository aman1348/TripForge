const UserInfo = require('../models/UserInfo');

module.exports.createUserInfo = async (req, res, next) => {
    const newUserInfo = new UserInfo(req.body);
    // console.log("inserting user  : ", req.body);

    try {
        const doc = await newUserInfo.save();
        // const doc = await userInfo.insertMany([userInfo]);
        console.log('doc is', doc);
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports.updateUserInfo = async (req, res, next) => {
    const updatedUserInfo = req.body;
    console.log("updating user  : ", updatedUserInfo);

    try {
        const doc = await UserInfo.findByIdAndUpdate(updatedUserInfo.id, updatedUserInfo);
        // const doc = await userInfo.insertMany([userInfo]);
        console.log('doc is', doc);
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



module.exports.getUserInfo = async (req, res, next) => {
    const { email } = req.params;
    console.log('get user info email is ',email);
    try {
        const currUserInfo = await UserInfo.find({ email: email });
        console.log('currentUserInfo', currUserInfo);
        res.status(201).json(currUserInfo);
    } catch (err) {
        res.status(400).json(err);
    }
}
module.exports.getAllUserInfo = async (req, res, next) => {
    // console.log('id is ',id);
    try {
        const allUserInfo = await UserInfo.find();
        console.log('all UserInfo', allUserInfo);
        res.status(201).json(allUserInfo);
    } catch (err) {
        res.status(400).json(err);
    }
}
module.exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;

    // console.log('id is ',id);
    try {
        const allUserInfo = await UserInfo.findByIdAndDelete(id);
        console.log('deleted user', allUserInfo);
        res.status(201).json(allUserInfo);
    } catch (err) {
        res.status(400).json(err);
    }
}
