const User = require("../models/user");

const migrate = async () => {
  try {
    await User.updateMany(
      { isActive: { $exists: false } }, // only update missing ones
      { $set: { isActive: true } }
    );

    console.log("Migration done ✅");

  } catch (error) {
    console.error("Migration failed ❌", error);
    throw error;
  }
};

module.exports = migrate;