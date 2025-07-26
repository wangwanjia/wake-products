
/**
 * 网站访问量模型
 * 记录每个每个用户访问
 */
module.exports = (sequelize, DataTypes) => {
  const WebAccess = sequelize.define('WebAccess', {
    // 访问IP
    ip: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '访问IP',
      defaultValue: '未知'
    },
    // 访问用户Id
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '访问用户Id',
      defaultValue: 0
    },
    // 访问用户名
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '访问用户名',
      defaultValue: '未知'
    },
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  return WebAccess;
};