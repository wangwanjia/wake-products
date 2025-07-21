
/**
 * 网站访问量模型
 * 记录每个地区访问量 
 * 
 */
module.exports = (sequelize, DataTypes) => {
  const WebArea = sequelize.define('WebArea', {
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '访问量'
    },
    // 国家
    country: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '访问地区 国家',
      defaultValue: '未知'
    },
    // 省份
    province: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '访问地区 省份',
      defaultValue: '未知'
    },

  }, {
    timestamps: true,
    freezeTableName: true,
    indexes: [
      { 
        unique: true,
        fields: ['province'] // 按省份索引，方便省份统计查询
      },
    ]
  });

  return WebArea;
};