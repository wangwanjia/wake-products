//网站的配置
module.exports = (sequelize, DataTypes) => {
  const ConfigTable = sequelize.define('ConfigTable', {
    postAdInsertCode: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '帖子广告插入代码'
    },
 
    
    
  }, {
    timestamps: true,
    freezeTableName: true
  });

  return ConfigTable;
};