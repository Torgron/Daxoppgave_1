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
        let db=firebase.firestore();
        

            let form = $(".form")[0];
            let input = $(".input")[0];
            let submit = $(".submit")[0];

            //The form.addEventListener() method attaches an event handler to the form.
            //"() =>" is a shorter way to write a function syntax.
            form.addEventListener("submit", (event) => {
                //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
                event.preventDefault();

            //Creates variable with input data as an object.
            let docDataReview = {
                input: input.value
            };

            db.collection("rew").doc().set(docDataReview).then(()=>{
                console.log("Suksess");
                window.location.reload();
            }).catch(err => console.log(err));
            });

            let navnListe = [];

            function hentData(doc){
                console.log(navnListe);
                navnListe.push(doc.data().input);
                $(".output").text(navnListe);
                console.log(navnListe);

                /*
                let html = document.createElement('li');
                html.innerHTML += doc.data().input;
                JSON.stringify(html);
                let list = document.getElementById("liste");
                list.appendChild(html);
                */
            }

            db.collection("rew").get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    hentData(doc)
                });
            }).catch(err => {
                console.log(err);
            })