
module.exports = (sequelize, DataTypes) => {
  const OpenCode = sequelize.define('OpenCode', {
    // 开奖时间
    openTime: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: '开奖时间'
    },
    // 期数
    expect: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 366
      },
      comment: '期数'
    },
    // 开奖号码 是个数组
    openCode: {
      type: DataTypes.JSON,
      allowNull: [],
      comment: '开奖号码'
    },
    // 生肖
    zodiac: {
      type: DataTypes.JSON,
      allowNull: [],
      comment: '生肖'
    },
    // 波色
    wave: {
      type: DataTypes.JSON,
      allowNull: [],
      comment: '波色'
    }
   
  }, {
    timestamps: true,
    freezeTableName: true
  });


  return OpenCode;
};