const functions = require("firebase-functions");
const admin = require("./config/firebaseConfig");
const regionHttps = functions.region('asia-northeast3').https; //asia-northeast3 서버로 맞추기

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as algoliasearch from "algoliasearch";

const algoliaClient = algoliasearch(functions.config().algolia.appid, functions.config().algolia.apikey);
const index = algoliaClient.initIndex("studentList_algolia");

exports.sendCollectionToAlgolia = functions
regionHttps.onRequest((request, response) => {
    const firestore = admin.firestore();
    const algoliaRecords = [];
    const snapshot = firestore.collection("ClassList").listDocuments().get();
    snapshot.forEach((doc) => {
        const document = doc.data();
        const record = {
            objectID: doc.id,
            title: document.title,
        };
        algoliaRecords.push(record);
    });

    // After all records are created, save them to Algolia
    index.saveObjects(algoliaRecords, (_error, content) => {
        console.log(content)
        response.status(200).send("COLLECTION was indexed to Algolia successfully.");
    });
});
