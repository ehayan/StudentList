const functions = require('firebase-functions');
const admin = require('./config/firebaseConfig');
const regionHttps = functions.region('asia-northeast3').https;
const cors = require('cors')({
    origin: ['http://localhost:8080', 'http://127.0.0.1:5001'],//==white list, 이 주소로 오는 것만 허용(* 로 하면 모든 origin으로 받음)
    credentials: true
});
exports.registerTeacher = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        // const _user = {
        //     email: request.body.id,
        //     password: request.body.pw,
        // }
        // const _data = {
        //     id: request.body.id,
        //     name: request.body.name,
        //     gender: request.body.gender,
        //     birth: request.body.birth
        // }
        const id = request.body.id
        const password = request.body.pw
        const name = request.body.name
        const gender = request.body.gender
        const birth = request.body.birth

        const _data = {id: id, name:name, gender:gender, birth:birth};
        const _user = {email: id, password:password}

        const auth = admin.auth();
        auth.createUser(_user)
            .then(async (userCredential) => {
                // console.log(userCredential)
                await admin.firestore().collection('teachers').doc(userCredential.uid).set(_data);
                response.json({result: 'success', message: `데이터 ${userCredential.email} 등록 성공`, data: {uuid: userCredential.uid}});
            })
            .catch((e) => {
                console.log(e.code)
                response.json({result: 'fail', message: '등록 실패', data: {error: e.code}});
            })
    })
});

exports.registerClass = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const _data = {
            teacherEmail: request.body.teacherEmail,
            grade: request.body.grade,
            ban: request.body.ban,
            admissionYear: request.body.admissionYear
        }
        const isEmpty = (obj) => !Object.values(obj).every(x => (x !== null && x !== "" && x !== undefined))

        if (!isEmpty(_data)) {
            const writeResult = await admin.firestore().collection('classes').add(_data)
            response.json({result: 'success', message: `데이터 ${writeResult.id} 등록 성공`, data: {uuid: writeResult.id}});
        }
        response.json({result: 'fail', message: '등록 실패', data: {error: 1}});
    })
});

exports.registerStudent = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const _data = {
            name: request.body.name,
            age: request.body.age,
            gender: request.body.gender,
            grade: request.body.grade,
            ban: request.body.ban,
        }
        console.log(_data)

        const isEmpty = (obj) => !Object.values(obj).every(x => (x !== null && x !== "" && x !== undefined))

        if (!isEmpty(_data)) {
            const writeResult = await admin.firestore().collection('students').add(_data)
            response.json({result: 'success', message: `데이터 ${writeResult.id} 등록 성공`, data: {uuid: writeResult.id}});
        }
        response.json({result: 'fail', message: '등록 실패', data: {error: 1}});
    })
});