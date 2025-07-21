
const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Insert = sequelize.define('Insert', {
    // 论坛类型
    forumType: {
      type: DataTypes.ENUM('common', 'macao', 'macao_new', 'hongkong'),
      unique: true,
      allowNull: false,
      comment: '论坛类型:common,macao,macao_new,hongkong'
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '论坛banner图'
    },
    headerCode: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '头部代码'
    },
    footerCode: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '底部代码'
    },
    articleHeaderCode: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '文章内头部代码'
    },
    articleFooterCode: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '文章内底部代码'
    }
  }, {
    timestamps: true,
    freezeTableName: true
  });

  // 添加静态方法用于初始化数据
  Insert.initData = async () => {
    try {
      // 定义需要初始化的论坛类型数组
      const forumTypes = ['common', 'macao', 'macao_new', 'hongkong'];

      // 遍历论坛类型数组
      for (const forumType of forumTypes) {
        // 检查该论坛类型的数据是否存在
        const found = await Insert.findOne({ where: { forumType } });
        if (!found) {
          // 若不存在则创建默认数据
          await Insert.create({
            forumType,
            bannerImage: '',
            headerCode: '',
            footerCode: '',
            articleHeaderCode: '',
            articleFooterCode: ''
          });
          console.log(`Created default data for forumType: ${forumType}`);
        }
      }
    } catch (error) {
      console.error('Error initializing Insert data:', error);
    }
  };

  return Insert;
};