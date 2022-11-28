const functions = require('firebase-functions');
const admin = require('./config/firebaseConfig');
const regionHttps = functions.region('asia-northeast3').https;
const cors = require('cors')({
    origin: ['http://localhost:8080'],
    credentials: true
});
exports.updateStudent = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const _id = request.body.id;
        const _data = {
            name: request.body.name,
            age: request.body.age,
            gender: request.body.gender,
            grade: request.body.grade,
            ban: request.body.ban
        }
        await admin.firestore().collection('students').doc(_id).set(_data, {merge: true})
            .then(() => response.json({result: 'success', message: `데이터 업데이트 성공`, data: {id: request.query.id}}))
            .catch(() => response.json({result: 'fail', message: `업데이트 오류 발생`, data: {error: 1}}));
    })
})

exports.deleteStudent = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const _id = request.body.id;
        await admin.firestore().collection('students').doc(_id).delete()
            .then(() => response.json({result: 'success', message: `데이터 삭제 성공`, data: {error: 0}}))
            .catch(() => response.json({result: 'fail', message: `삭제 오류 발생`, data: {error: 1}}))
    })
});