'use strict';
// 首次运行项目时，运行初始化数据库
// 数据库表字段更新时运行

const { Sequelize, DataTypes } = require('sequelize');
const config = require(__dirname + '/../config/config.json');// 引入配置文件
const env = process.env.NODE_ENV || 'development';// 默认是开发环境

const fs = require('fs');// 引入文件模块
const path = require('path');

let initDb = {};

// 建立数据库连接
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
    host: config[env].host,
    port: config[env].port,
    dialect: config[env].dialect,
    timezone: config[env].timezone,
    pool: {
        max: 10,
        min: 0,
        idle: 10000
    }
})

// 测试数据库连接
let modelDefiners = []
try {
    (async function () {
        await sequelize.authenticate();
        console.log("数据库连接成功");
        // 读取models文件下的所有js文件
        const tempUrl = path.join(__dirname, '../models');
        let tempDirArr = fs.readdirSync(tempUrl);
        for (let i = 0; i < tempDirArr.length; i++) {
            modelDefiners.push(require(`${tempUrl}/${tempDirArr[i]}`))
        }
        // 执行每个模块默认导出的方法
        for (const modelDefiner of modelDefiners) {
            modelDefiner(sequelize, DataTypes);
        }
        // 强制更新数据库
        sequelize.sync({ alter: true });
    })()
} catch (error) {
    console.error('数据库连接失败', error);
}

initDb.sequelize = sequelize;
initDb.Sequelize = Sequelize;

module.exports = initDb;
