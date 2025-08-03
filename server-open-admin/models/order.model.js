// 订单模型
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    // 论坛类型
    forumType: {
      type: DataTypes.ENUM('macao', 'macao_new', 'hongkong'),
      unique: true,
      allowNull: false,
      comment: '论坛类型:macao,macao_new,hongkong'
    },
    // 帖子ID
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '帖子ID'
    },
    // 帖子标题
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '帖子标题'
    },
    
    // 订单号
    orderNumber: {
      type: DataTypes.STRING,
      unique: true,
      comment: '订单号'
    },
    // 用户ID
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '用户ID'
    },
    // 用户名
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '用户名'
    },
    // 订单金额
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
        max: 1000000000
      },
      comment: '订单金额'
    },
    // 订单状态
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending',
      comment: '订单状态'
    },
    // 下单IP
    orderIp: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '下单IP'
    },
  }, {
    timestamps: true,
    freezeTableName: true
  });

// // 订单模型关联用户模型
//   Order.belongsTo(sequelize.models.User, {
//     foreignKey: 'userId',
//     targetKey: 'id'
//   });
//   // 订单模型关联帖子模型
//   Order.belongsTo(sequelize.models.Posts, {
//     foreignKey: 'postId',
//     targetKey: 'id'
//   });

  return Order;
};

