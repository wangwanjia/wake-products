
/**
 * 网站访问量模型
 * 记录每天的用户访问量
 */
module.exports = (sequelize, DataTypes) => {
  const WebView = sequelize.define('WebView', {
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
    deviceViews: {
      type: DataTypes.ENUM('desktop', 'mobile', 'tablet'),
      defaultValue: 'desktop',
      allowNull: true,
      comment: '各设备访问量，包含 desktop（桌面端）、mobile（移动端）、tablet（平板端）'
    },

    // 访问地区信息，包含国家、省份、城市
    location: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '访问地区信息，包含 country（国家）、province（省份）、city（城市）',
      defaultValue:'未知,未知,未知'
    },
    
  }, {
    timestamps: true,
    freezeTableName: true,
  });

  return WebView;
};