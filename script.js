// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyD0P6nfDr4BNkbEHDFVklVe9zjv_8eEcXk",
    authDomain: "anmeldelser-c1f00.firebaseapp.com",
    projectId: "anmeldelser-c1f00",
    storageBucket: "anmeldelser-c1f00.appspot.com",
    messagingSenderId: "792272160394",
    appId: "1:792272160394:web:01158f6a858ffb71774f73",
    measurementId: "G-9273ZPPMKY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let db = firebase.firestore();

let navnForm = $("#navnForm")[0];
let navnInput = $("#navnInput")[0];
let navnSubmit = $("#navnSubmit")[0];

navnForm.addEventListener("submit", (event) => {
    event.preventDefault();

    sessionStorage.setItem('inputValue', navnInput.value);
    let sesNameInput = sessionStorage.getItem('inputValue');

    $("#welcomeHeader").text("Velkommen, vi ønsker deg alt som er godt, " + sesNameInput + "!");

    let docDataReview = {
        input: navnInput.value
    };

    db.collection("rew").doc().set(docDataReview).then(() => {
        console.log("Suksess");
    }).catch(err => console.log(err));

    navnInput.value = "";

});

let navnListe = [];

function hentData(doc) {
    console.log(navnListe);
    navnListe.push(" " + doc.data().input);
    $("#navnOutput").text(navnListe);
    console.log(navnListe);
}

db.collection("rew").get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        hentData(doc)
    });
}).catch(err => {
    console.log(err);
})

let numberChangeSnd = new Audio("numberChange.wav");
let colorChangeSnd = new Audio("colorChange.wav");

let luckyNumber;

function newLuckyNumber() {
    luckyNumber = Math.floor(Math.random() * (10 - 1) + 1);
    $("#lykketallOutput").text(luckyNumber);
}

let lastMinute = new Date().getMinutes();

function checkMinute() {
    let = userNumber = $("#numberInput")[0].value;
    let currentMinute = new Date().getMinutes();
    if (currentMinute !== lastMinute) {
        lastMinute = currentMinute
        console.log("Minute changed")
        numberChangeSnd.play();
        newLuckyNumber();
        if (userNumber == luckyNumber) {
            $("body").css("background-color", "#" + Math.floor(Math.random()*16777215).toString(16));
            colorChangeSnd.play();
            alert("DETTE ER DIN NYE LYKKEFARGE!");
        }
    };
    setTimeout(checkMinute, 1000);
};

checkMinute();
newLuckyNumber();