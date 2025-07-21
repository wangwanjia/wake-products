
/**
 * 网站访问量模型
 * 记录每天的用户访问量
 */
module.exports = (sequelize, DataTypes) => {
  const WebView = sequelize.define('WebView', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: '日期（YYYY-MM-DD）',
      defaultValue: DataTypes.NOW
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '访问量'
    },
    desktopViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '桌面端访问量'
    },
    mobileViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '移动端访问量'
    },
    tabletViews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '平板端访问量'
    },
    
  }, {
    timestamps: true,
    freezeTableName: true,
    indexes: [
      { 
        unique: true,
        fields: ['date'] // 按日期索引，方便时间序列查询
      },
    ]
  });

  return WebView;
};