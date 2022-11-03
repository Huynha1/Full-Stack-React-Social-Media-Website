module.exports = (sequelize, DataTypes) =>
  sequelize.define("post", {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    votes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    image: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }

  }, {
    // Don't add the timestamp attributes (updatedAt, createdAt).
    timestamps: false
  });
