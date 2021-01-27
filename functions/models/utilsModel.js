var firebaseApp = require("firebase");

async function getPlanById(id) {
  try {
    return await firebaseApp
      .database()
      .ref("plans/" + id)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getPlanById,
};
