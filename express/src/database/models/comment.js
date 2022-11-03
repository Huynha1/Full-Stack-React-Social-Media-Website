module.exports = (sequelize, DataTypes) =>
  sequelize.define("comment", {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
