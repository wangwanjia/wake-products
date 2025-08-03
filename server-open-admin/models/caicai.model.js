//网站的配置
module.exports = (sequelize, DataTypes) => {
  const Caicai = sequelize.define('Caicai', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '彩彩',
      comment: '彩彩名称'
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '论坛Logo图片'
    },
    watermarkImage: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '水印图片路径'
    },
    bannerImage: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '背景大图路径'
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

  return Caicai;
};