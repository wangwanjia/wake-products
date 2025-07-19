
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 128]
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: { isEmail: true }
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: 'default-avatar.jpg'
    }
  }, {
    timestamps: true,
    freezeTableName: true
  });

  User.associate = models => {
    User.hasMany(models.Post, { foreignKey: 'authorId' });
  };



  return User;
};