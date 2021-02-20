'use strict';

const { models } = require('../utils/db');

// 获取列表
async function getAll(req, res, next) {
	let currentPage = parseInt(req.query.currentPage) || 1;// 默认第一页
	let pageSize = parseInt(req.query.pageSize) || 10;// 默认每页展示10条
	let sortby = req.query.sortby || 'id';// 默认id属性排序
	let order = req.query.order || 'DESC';// 默认降序排序
	const users = await models.User.findAll({
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
	const oneUser = await models.User.findAll({
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
	res.status(200).json('OK');
}

module.exports = {
	getAll,
	getById,
	createNew,
	updateById,
	removeById,
	register
};