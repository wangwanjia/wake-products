
/**
 * 网站访问量模型
 * 记录每个每个用户访问
 */
module.exports = (sequelize, DataTypes) => {
  const WebAccess = sequelize.define('WebAccess', {
    // 用户ID
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: '用户UUID'

    },
    // 用户名
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '用户名'
    },

    // 访问的API
    api: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '访问的API接口名称'
    },
    // 请求时间
    requestTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      comment: '请求时间'
    },
    // 请求IP
    requestIp: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '请求IP地址'
    },
    // 请求的URL
    requestUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '请求的完整URL'
    }
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  return WebAccess;
};