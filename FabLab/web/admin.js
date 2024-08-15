
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { sendPasswordResetEmail, getAuth, updateProfile, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithRedirect, getRedirectResult, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";//https://cdnjs.cloudflare.com/ajax/libs/firebase/7.14.1-0/firebase-auth.js
//import { getAnalytics } from "/firebase/analytics";
import { doc, setDoc, getFirestore, collection, getDocFromCache, addDoc, Timestamp, onSnapshot, getDoc, query, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"



const firebaseConfig = {
    apiKey: "AIzaSyBY--8B6GMBAauWXdOh1bWyNFwO8LR1LfY",
    authDomain: "fablab-8b5aa.firebaseapp.com",
    projectId: "fablab-8b5aa",
    storageBucket: "fablab-8b5aa.appspot.com",
    messagingSenderId: "186686644354",
    appId: "1:186686644354:web:33281311d8365b421f949b",
    measurementId: "G-JXB0J1C4TG"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore()
const auth = getAuth(app)


document.getElementById('btnagregar').addEventListener('click', async () => {
    const nameUser = document.getElementById('inputnewuser').value
    const emailUser = document.getElementById('inputcorreouser').value
    const passwordUser = document.getElementById('inputpassworduser').value
    const rolUser = document.getElementById('inputadmin').value
    if (nameUser == "") showMessage("Ingrese un nombre", "error")
    else if (nameUser.toString().length < 8) showMessage("Ingrese un nombre completo", "error");
    else if (emailUser == "") showMessage("Ingrese un email", "error");
    else if (passwordUser == "") showMessage("Ingrese una contraseña", "error");
    else if (rolUser == "0") showMessage("Seleccione un rol")
    else
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailUser, passwordUser)
            console.log(userCredential.user.uid)
            console.log(userCredential)
            showMessage("Usuario Registrado");
            const uuUser = userCredential.user.uid.toString()
            newUserf(uuUser, passwordUser, nameUser, rolUser, emailUser)
            updateProfile(auth.currentUser, {
                displayName: nameUser
            })
            document.getElementById('inputnewuser').value = ""
            document.getElementById('inputcorreouser').value = ""
            document.getElementById('inputpassworduser').value = ""
            getUsers()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                showMessage("Correo electrónico ya en uso", "error")
            } else if (error.code === 'auth/invalid-email') {
                showMessage("Correo electrónico no válido", "error")
            } else if (error.code === 'auth/weak-password') {
                showMessage("Contraseña débil", "error")
            } else if (error.código) {
                showMessage("Algo salió mal", "error")
            }
        }
})

async function newUserf(uidUser, mypas, myname, rol, correo) {

    await setDoc(doc(db, "usuarios", uidUser), {
        correo: correo,
        name: myname,
        pas: mypas,
        rol: rol
    });
}



async function getUsers() {
    document.getElementById('tbodyusers').remove()
    var newtbody = document.createElement('tbody')
    newtbody.id = 'tbodyusers'
    var outtable = document.getElementById('tableusers')
    outtable.appendChild(newtbody)
    //Obtendremos a todo slos usuarios que existan en la BD, y los enlistaremos en una tabla
    const docRef3 = collection(db, "usuarios");

    const querySnapshot = await getDocs(docRef3)
    querySnapshot.forEach((doc1) => {
        var btnRecovery = document.createElement('button')
        btnRecovery.className = "btn btn-primary"
        btnRecovery.textContent = "Recuperar contraseña"
        console.log(doc1.data());
        let createtable = document.getElementById('tbodyusers')
        createtable.id = "tbodyusers"
        let newuser = createtable.insertRow(-1)
        let newcell = newuser.insertCell(0)
        newcell.textContent = doc1.data().name
        newcell = newuser.insertCell(1)
        newcell.textContent = doc1.data().correo
        newcell = newuser.insertCell(2)
        newcell.textContent = doc1.data().rol
        newcell = newuser.insertCell(3)
        newcell.appendChild(btnRecovery)
        btnRecovery.addEventListener('click', () => {
            var email = doc1.data().correo
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    console.log("ENVIADO CORREO");
                    // ..
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode);
                    console.log(errorMessage);
                    // ..
                });
        })

    })
}
getUsers()

function showMessage(message, type = "success") {
    Toastify({
      text: message,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: type === "success" ? "green" : "red",
      },
      // onClick: function () { } // Callback after click
    }).showToast();
  }