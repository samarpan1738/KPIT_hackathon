var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyDd55HkH5d1I1lol4Qht-VhSsa4_Id04ss",
    authDomain: "kpit-260310.firebaseapp.com",
    databaseURL: "https://kpit-260310.firebaseio.com",
    projectId: "kpit-260310",
    storageBucket: "kpit-260310.appspot.com",
    messagingSenderId: "674378348571",
    appId: "1:674378348571:web:3138f6405c1b788e6720be",
    measurementId: "G-ZNNE2FG0LT"
};
firebase.initializeApp(firebaseConfig);



let db=firebase.firestore()

exports=module.exports={db}
// let getUsers=async ()=>
// {   
//     let snapshot=await db.collection('users').get()
//     return snapshot.docs.map(doc=>doc.data())
// }
// // let getDoc = cityRef.get()
// //   .then(doc => {
// //     if (!doc.exists) {
// //       console.log('No such document!');
// //     } else {
// //       console.log('Document data:', doc.data());
// //     }
// //   })
// //   .catch(err => {
// //     console.log('Error getting document', err);
// //   });
// console.log(getUsers().then(docs=>console.log(docs)).catch((err)=> console.log(err)))