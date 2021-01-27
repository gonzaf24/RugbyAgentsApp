const firebaseApp = require("firebase/app");
const admin = require("firebase-admin");

async function findClubByEmail(email) {
  try {
    const emailEdited = email.split(".").join(",");

    let db = admin.firestore();
    let result = await db.collection("clubs").doc(emailEdited).get();
    return result.data();

    /*  return await firebaseApp
      .database()
      .ref("/clubs/" + emailEdited)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      }); */
  } catch (error) {
    console.log("findClubByEmail" + error);
    throw error;
  }
}

async function newClub(club, email) {
  try {
    const emailEdited = email.split(".").join(",");
    let db = admin.firestore();
    //Agrego datos a firestore
    return await db
      .collection("clubs")
      .doc(emailEdited)
      .set({ ...club, userEmail: email });
    /* 

    return await firebaseApp
      .database()
      .ref("clubs/" + emailEdited)
      .set(club); */
  } catch (error) {
    console.log("newClub" + error);
    throw error;
  }
}

async function editClub(email, club) {
  try {
    const emailEdited = email.split(".").join(",");
    const clubAux = await findClubByEmail(email);
    const clubPersist = { ...clubAux, ...club };

    let db = admin.firestore();
    return await db.collection("clubs").doc(emailEdited).update(clubPersist);

    /*   return await firebaseApp
      .database()
      .ref("clubs/" + emailEdited)
      .set(clubPersist); */
  } catch (error) {
    console.log("editClub" + error);
    throw error;
  }
}

async function deleteClub(email, uid) {
  try {
    const emailEdited = email.split(".").join(",");

    let db = admin.firestore();
    await db.collection("clubs").doc(emailEdited).delete();

    /*  await firebaseApp
      .database()
      .ref("clubs/" + emailEdited)
      .remove(); */
  } catch (error) {
    console.log("deleteClub" + error);
    throw error;
  }
  return "ok";
}

module.exports = {
  findClubByEmail,
  newClub,
  editClub,
  deleteClub,
};
