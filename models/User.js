'use strict';

// 定义User模型
const User = (sequelize, DataTypes) => {
    sequelize.define('User', {
        // 在这里定义模型属性
        id: {
            type: DataTypes.INTEGER(11),
            primaryKey: true,// 主键
            autoIncrement: true,// 自动递增
        },
        // member_id: {
        //     type: DataTypes.STRING,
        //     comment: '会员ID'
        // },
        nickname: {
            type: DataTypes.STRING,
            comment: '昵称'
        },
        username: {
            type: DataTypes.STRING,
            comment: '用户名'
        },
        age: {
            type: DataTypes.INTEGER(3),
            comment: '年龄'
        },
        sex: {
            type: DataTypes.STRING,
            comment: '性别'
        },
        id_card: {
            type: DataTypes.STRING,
            comment: '身份证'
        },
        country: {
            type: DataTypes.STRING,
            comment: '国家'
        },
        province: {
            type: DataTypes.STRING,
            comment: '省'
        },
        area: {
            type: DataTypes.STRING,
            comment: '市'
        },
        county: {
            type: DataTypes.STRING,
            comment: '区'
        },
        address: {
            type: DataTypes.STRING,
            comment: '详细地址'
        },
        cellphone: {
            type: DataTypes.STRING,
            comment: '手机号'
        },
        email: {
            type: DataTypes.STRING,
            // allowNull 默认为 true
            comment: '电子邮箱'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '密码'
        }
    }, {
        // 其他模型参数
        freezeTableName: true,// 默认false修改表名为复数，true不修改表名，与数据库表名同步
        tableName: 'user',// 指定表名
        timestamps: true // false关闭自动添加时间戳功能, true打开
    });
}

module.exports = User;
