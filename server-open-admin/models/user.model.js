
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // uuid 字段
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    // 用户名
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // 密码
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    // 论坛url
    forumUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // 邮箱
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    // 电话
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // 到期时间
    expireTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => {
        const now = new Date();
        now.setMonth(now.getMonth() + 1);
        return now;
      }
    }
  }, {
    timestamps: true,
    freezeTableName: true
  });

  return User;
};