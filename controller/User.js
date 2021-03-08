'use strict';

const { models } = require('../utils/db');
const { User } = models
const { Op } = require("sequelize");

// 获取列表
async function getAll(req, res, next) {
	let currentPage = parseInt(req.query.currentPage) || 1;// 默认第一页
	let pageSize = parseInt(req.query.pageSize) || 10;// 默认每页展示10条
	let sortby = req.query.sortby || 'id';// 默认id属性排序
	let order = req.query.order || 'DESC';// 默认降序排序
	const users = await User.findAll({
		order: [[sortby, order]],
		offset: (currentPage - 1) * pageSize,
		limit: pageSize
	});
	res.status(200).json({
		users: users,
		pagination: {
			currentPage,
			pageSize,
			// 一共多少条记录
			total: users.length
		}
	});
}

// 获取一个
async function getById(req, res, next) {
	const oneUser = await User.findAll({
		where: {
			id: req.params.id
		}
	});
	res.status(200).json(oneUser);
}

// 创建一个
async function createNew(req, res, next) {
	res.send('post one');
}

// 更新一个
async function updateById(req, res, next) {
	res.send('put one');
}

// 删除一个
async function removeById(req, res, next) {
	res.send('delete one');
}

// 注册
async function register(reg, res, next) {
	const oneUser = await User.findAll({
		where: reg.body
	});
	let result = null
	if (oneUser.length > 0) {
		result = {
			code: -1,
			msg: `账号${reg.body.email || reg.body.cellphone}已存在，可直接登录`
		}
	} else {
		const newUser = await User.create(reg.body);
		result = {
			code: 2000,
			msg: `账号${newUser.email || newUser.cellphone}注册成功`
		}
	}
	res.status(200).json(result);
}

// 登录
async function login(reg, res, next) {
	const reqData = reg.body
	const oneUser = await User.findAll({
		where: {
			[Op.or]: [{ email: reqData.username }, { cellphone: reqData.username }],
			password: reqData.password
		}
	});
	// 
	res.status(200).json(oneUser);
}

module.exports = {
	getAll,
	getById,
	createNew,
	updateById,
	removeById,
	register,
	login
};