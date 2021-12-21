importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCJ91QcXijzalbxCcFLY9DL7VXcd9S2pcc",
    authDomain: "pickers-dev-332203.firebaseapp.com",
    projectId: "pickers-dev-332203",
    storageBucket: "pickers-dev-332203.appspot.com",
    messagingSenderId: "620196581830",
    appId: "1:620196581830:web:b2f5817cd803e97c41a2c7",
    measurementId: "G-33W5Z7D2ZM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    const title = 'admin-pickers.sitama.co.id'
    const options = {
        body: payload.notification,
        icon: "https://pickers.oss-ap-southeast-5.aliyuncs.com/icons/icon.png",
    };
    return self.registration.showNotification(title, options);
});