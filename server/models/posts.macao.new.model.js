module.exports = (sequelize, DataTypes) => {
  const PostMacaoNew = sequelize.define('PostMacaoNew', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题'
    },
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
      defaultValue: 1,
      allowNull: false,
      comment: '作者ID'
    },
    // 文章类型
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '文章类型'
    },
    // 置顶类型：0公告、1付费帖子、2精品、3热门
    top: {
      type: DataTypes.ENUM('0', '1', '2', '3'),
      defaultValue: '3',
      allowNull: false,
      comment: '置顶类型：0公告、1付费帖子、2精品、3热门'
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
      comment: '购买金额'
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

  return PostMacaoNew;
};
