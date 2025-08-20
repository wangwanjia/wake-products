// 订单模型
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
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
      defaultValue: 'cancelled',
      comment: '订单状态'
    },
  }, {
    timestamps: true,
    freezeTableName: true
  });

  return Order;
};

