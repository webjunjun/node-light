'use strict';

const createError = require('http-errors');// 处理错误中间件
const express = require('express');
const path = require('path');// 处理文件路径的工具
const cookieParser = require('cookie-parser');// 用于解析 cookie 头来填充 req.cookies
const logger = require('morgan');// HTTP 请求记录器中间件
// const bodyParser = require('body-parser');// 用于使请求可以获取到req.body

// 路由导入
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// 添加视图
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/**
 * 使用中间件
 * express提供的内置中间件有三种：static，json，urlencoded
 */
app.use(logger('dev'));
// 用于使请求可以获取到req.body，body-parser已弃用
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置静态文件夹
app.use(express.static(path.join(__dirname, 'public'), {
  extensions:['html','htm']// 请求静态资源时，若没有后缀，增加默认后缀
}));

// 设置页面路由
const baseApi1 = '/api/v1';
app.use('/', indexRouter);
app.use(baseApi1, usersRouter);

// 捕获异常抛出
app.use(function(req, res, next) {
  next(createError(404));
});

// 错误事件句柄
app.use(function(err, req, res, next) {
  // 开发环境下设置locals，输出错误信息
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 返回错误页面，生产环境下没有错误信息
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;