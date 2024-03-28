const express = require('express');
// const {createUser, loginUser, checkAuth} = require('../controller/Auth');
const { createUserInfo, getUserInfo, getAllUserInfo, deleteUser, updateUserInfo } = require('../controller/User')
const router = express.Router();
router.post('/add-info', createUserInfo)
      .put("/updateUser", updateUserInfo)
      .get('/:email', getUserInfo)
      .get('/', getAllUserInfo)
      .delete('/:id', deleteUser);


console.log("in routes");
module.exports = router;