const admin = require('firebase-admin');
const serviceAccount = require('./student-test001-firebase-adminsdk-ail44-7136f80a5f.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin