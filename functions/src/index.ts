//import * as functions from "firebase-functions";
import * as admin from "firebase-admin"
import * as functions from "firebase-functions"
const serviceAccount = require('../service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});




type Corner = {
    id: number,
    playerID: number,
    cts: number[],
    tov: number
};
type Tile = {
    id: number,
    type:string
    isTheft:boolean
    corners: Corner[],
};

exports.syncTable = functions.https.onCall(async (data: Tile[], ctx) => {
    //truncate the prev game data
    await admin.firestore().doc("/game/tiles").delete();
    await admin.firestore().doc("/game/tiles").create({tiles:[]}) 
    try{
        for (const tile of data) {
            //delete the prev game content
            const t = await admin.firestore().doc("/game/tiles").get()
            const pd = t.data()
            const prevTiles : Tile[] = pd?.tiles
            //create the new content
            console.log(tile)
            await admin.firestore().doc(`/game/tiles`).update({tiles:[...prevTiles, tile]})
        }
    }
    catch (error){
        return {success:false}
    }
    return {
        success: true
    }
})
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

