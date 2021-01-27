const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");

async function findPlayerByEmail(email) {
  try {
    const emailEdited = email.split(".").join(",");

    let db = admin.firestore();
    let result = await db.collection("players").doc(emailEdited).get();
    /*  .then((querySnapshot) => {
        let salida;
        querySnapshot.forEach((doc) => {
          salida = doc.data();
        });
        return salida;
      }); */
    return result.data();

    /*  return await firebaseApp
      .database()
      .ref("/players/" + emailEdited)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      }); */
  } catch (error) {
    console.log("findPlayerByEmail" + error);
    throw error;
  }
}

async function newPlayer(player, email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    //Agrego datos a firestore
    return await db
      .collection("players")
      .doc(emailEdited)
      .set({ ...player, userEmail: email });
    /* 
    return await firebaseApp
      .database()
      .ref("players/" + emailEdited)
      .set(player); */
  } catch (error) {
    console.log("newPlayer" + error);
    throw error;
  }
}

async function editPlayer(email, player) {
  try {
    const emailEdited = email.split(".").join(",");
    const playerAux = await findPlayerByEmail(email);
    const playerPersist = { ...playerAux, ...player };

    let db = admin.firestore();
    return await db
      .collection("players")
      .doc(emailEdited)
      .update(playerPersist);

    /*   return await firebaseApp
      .database()
      .ref("players/" + emailEdited)
      .set(playerPersist); */
  } catch (error) {
    console.log("editplayer" + error);
    throw error;
  }
}

async function deletePlayer(email, uid) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    await db.collection("players").doc(emailEdited).delete();
    /* 
    await firebaseApp
      .database()
      .ref("players/" + emailEdited)
      .remove(); */
  } catch (error) {
    console.log("deletePlayer" + error);
    throw error;
  }
  return "ok";
}

module.exports = {
  findPlayerByEmail,
  newPlayer,
  editPlayer,
  deletePlayer,
};
