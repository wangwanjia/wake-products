module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', { 
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题'
    },
    // 免费分内容
    content: {
      type: DataTypes.TEXT,
      comment: '内容'
    },
    // 收费内容
    chargeContent: {
      type: DataTypes.TEXT,
      comment: '收费内容'
    },
    // 作者名称
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '作者名称'
    },
    // 作者ID，默认为1
    authorId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '作者ID'
    },
    // 文章类型 玩法
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '文章类型'
    },
    // 置顶类型：0公告、1付费帖子、2精品、3热门
    top: {
      type: DataTypes.ENUM('notice', 'charge', 'best', 'hot'),
      defaultValue: 'hot',
      allowNull: false,
      comment: '置顶类型：notice公告、charge付费帖子、best精品、hot热门'
    },
    // 是否显示帖子：布尔值
    isVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
      comment: '是否显示帖子：布尔值'
    },
    // 是否收费
    isCharge: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: '是否收费'
    },
    // 权重 ：0-100
    weight: {
      type: DataTypes.STRING,
      defaultValue: '0',
      allowNull: false,
      validate: {
        min: 0,
        max: 1000
      },
      comment: '权重 ：0-1000'
    },
    // 浏览量
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      },
      comment: '浏览量'
    },
    // 真实浏览量
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      },
    },
    // 购买人数
    purchaseCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      },
      comment: '购买人数'
    },
    // 购买金额
    purchaseAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0
      },
      comment: '购买金币'
    },
    // 购买用户
    purchaseUsers: {
      type: DataTypes.JSON,
      defaultValue: [],
      allowNull: true,
      comment: '购买用户'
    },
  }, {
    timestamps: true,
    freezeTableName: true
  });

  return Posts;
};
