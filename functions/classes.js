const functions = require('firebase-functions');
const admin = require('./config/firebaseConfig');
const regionHttps = functions.region('asia-northeast3').https;
const cors = require('cors')({
    origin: ['http://localhost:8080', 'http://127.0.0.1:5001'],
    credentials: true
});
exports.updateClass = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const _id = request.body.id;
        const _data = {
            grade: request.body.grade,
            ban: request.body.ban,
            admissionYear: request.body.admissionYear
        }
        await admin.firestore().collection('classes').doc(_id).set(_data, {merge: true})
            .then(() => response.json({result: 'success', message: `데이터 업데이트 성공`, data: {id: request.query.id}}))
            .catch(() => response.json({result: 'fail', message: `업데이트 오류 발생`, data: {error: 1}}));
    })
})

exports.deleteClass = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const _id = request.body.id;
        await admin.firestore().collection('classes').doc(_id).delete()
            .then(() => response.json({result: 'success', message: `데이터 삭제 성공`, data: {error: 0}}))
            .catch(() => response.json({result: 'fail', message: `삭제 오류 발생`, data: {error: 1}}))
    })
});