
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
    isMacao: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: '是否开启macao'
    },
    isMacaoNew: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: '是否开启macao_new'
    },
    isHongkong: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: '是否开启hongkong'
    },
  }, {
    timestamps: true,
    freezeTableName: true
  });

  return Caicai;
};