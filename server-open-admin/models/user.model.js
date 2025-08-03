
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // 用户IP
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '用户IP'
    },
    account: {
      type: DataTypes.STRING,
      validate: {
        len: [4,30]
      },
      unique: true,
      allowNull: false,
      comment: '账号'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 128]
      },
      comment: '密码'
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true },
      comment: '邮箱'
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'default-avatar.jpg',
      comment: '头像'
    },
    // 管理员
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: '是否管理员'
    },
    // 用户等级，默认1级
    level: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        min: 1,
        max: 10
      },
      comment: '等级'
    },
    // 手机号
    phone: {
      type: DataTypes.STRING,
      validate: {
        is:/^1[3-9]\d{9}$/
      },
      comment: '手机号'
    },
    // 金币数量
    gold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
        max: 1000000000
      },
      comment: '金币'
    },
    // 历史金币总量
    historyGold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
      },
      comment: '历史金币'
    },
    // 购买的帖子ID列表
    purchasedPostIds: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: false,
      comment: '购买的帖子ID列表'
    },
  }, {
    timestamps: true,
    freezeTableName: true
  });

  return User;
};