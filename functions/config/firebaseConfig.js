const admin = require('firebase-admin');
const serviceAccount = require('./student-test001-firebase-adminsdk-ail44-da7f801eab.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin