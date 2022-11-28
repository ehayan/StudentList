const functions = require('firebase-functions');
// const admin = require('./config/firebaseConfig');
// const regionHttps = functions.region('asia-northeast3').https;
// const cors = require('cors')({
//     origin: ['http://localhost:8080'],
//     credentials: true
// });

const register = require('./register')
exports.registerTeacher = register.registerTeacher
exports.registerClass = register.registerClass
exports.registerStudent = register.registerStudent

const students= require('./students')
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

