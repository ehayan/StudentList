const functions = require('firebase-functions');
const admin = require('./config/firebaseConfig');
const regionHttps = functions.region('asia-northeast3').https;
const cors = require('cors')({
    origin: ['http://127.0.0.1:5001', 'http://localhost:8080'],
    credentials: true
});

const register = require('./register')
exports.registerTeacher = register.registerTeacher
exports.registerClass = register.registerClass
exports.registerStudent = register.registerStudent

const students = require('./students')
exports.updateStudent = students.updateStudent
exports.deleteStudent = students.deleteStudent

const classes = require('./classes')
exports.updateClass = classes.updateClass
exports.deleteClass = classes.deleteClass
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = regionHttps.onRequest((request, response) => {
//     functions.logger.info("Hello logs!", {structuredData: true});
//     response.send("Hello from Firebase!");
// });

exports.getlogin = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const id = request.body.id

        admin.auth().getUserByEmail(id)
            .then((userRecord) => {
                // console.log(userRecord)
                // console.log(userRecord.providerData[0]) //UserInfo
                response.json(userRecord.providerData[0]);
            })
    })
});

exports.getClasses = regionHttps.onRequest(async (request, response) => {
    cors(request, response, async () => {
        const email = request.body.email;
        const querySnapshot = await admin.firestore().collection('classes')
            .where('teacherEmail', '==', email)
            .get()

        let _classList = [];

        if (querySnapshot.size === 0) {
            return response.json({result: 'fail'})
        }
        querySnapshot.forEach((doc) => {
            const _data = doc.data();
            _data['id'] = doc.id;
            _classList.push(_data);
        });
        response.json({result: 'success', data: _classList})
    })
});