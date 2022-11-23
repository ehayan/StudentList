const functions = require('firebase-functions');
const admin = require('./config/firebaseConfig');
const regionHttps = functions.region('asia-northeast3').https;
const cors = require('cors')({
    origin: ['http://localhost:8080'],
    credentials: true
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = regionHttps.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     response.send("Hello from Firebase!");
// });

exports.registerTeacher = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const _user = {
            email: request.body.id,
            password: request.body.pw,
        }
        const _data = {
            name: request.body.name,
            gender: request.body.gender,
            birth: request.body.birth
        }
        const auth =admin.auth();
        auth.createUser(_user)
            .then(async (userCredential) => {
                // console.log(userCredential)
                const writeResult = await admin.firestore().collection('teachers').add(_data);
                response.json({result: 'success', message: `데이터 ${writeResult.id} 등록 성공`, data: {uuid: writeResult.id}});
            })
            .catch((e) => {
                console.log(e.code)
                response.json({result: 'fail', message: '등록 실패', data: {error: e.code}});
            })
    })
});