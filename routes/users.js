'use strict';

const express = require('express');
const router = express.Router();
const UserController = require('../controller/User');

/* user表restful */
router.route('/user')
.get(UserController.getAll)
.post(UserController.createNew)
.put(UserController.updateById)

router.route('/user/:id')
.get(UserController.getById)
.delete(UserController.removeById)

// 注册接口
router.route('/user/register')
.post(UserController.register)

// 登录接口
router.route('/user/login')
.post(UserController.login)

module.exports = router;
