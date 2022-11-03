module.exports = (sequelize, DataTypes) =>
  sequelize.define("follow", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
