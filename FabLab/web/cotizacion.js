import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { sendPasswordResetEmail, getAuth, updateProfile, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithRedirect, getRedirectResult, signOut, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";//https://cdnjs.cloudflare.com/ajax/libs/firebase/7.14.1-0/firebase-auth.js
//import { getAnalytics } from "/firebase/analytics";
import {updateDoc, doc, setDoc, getFirestore, collection, getDocFromCache, addDoc, Timestamp, onSnapshot, getDoc, query, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js"
//import {getStorage, ref } from"https://cdnjs.cloudflare.com/ajax/libs/firebase/10.2.0/firebase-storage.min.js"
//import {getStorage, ref, uploadBytes} from"https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js"
import {cotizacionPDF} from './cotizacionPDF.js'



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
const firebase = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth(app)



document.getElementById('divp2').hidden = true

document.getElementById('selectCalculo').addEventListener('change', () => {
    var valor = document.getElementById('selectCalculo').value
    if (valor == '1') {

        document.getElementById('divp2').hidden = true
    } else if (valor == '2') {

        document.getElementById('divp2').hidden = false
    }
    else if (valor == '3') {

        document.getElementById('divp2').hidden = false
    }
    else if (valor == '4') {
        document.getElementById('divp2').hidden = false
    }
})





document.getElementById('btncalcular').addEventListener('click', () => {
    var valor = document.getElementById('selectCalculo').value
    var lprecio = document.getElementById('lprecio')
    var lprecioM = document.getElementById('lprecioM')
    
    var cantidad = document.getElementById('inputCantidadG').value

    var preciot = 0
    if (valor == '1') {
        preciot = onlyMaterial()
       
    } else if (valor == '2') {
        preciot = onlyMaterial()
        console.log("M =" + preciot)
        preciot += tiempoLaser()
        console.log("T =" + preciot)

    } else if (valor == '3') {
        preciot = onlyMaterial()
        console.log("M =" + preciot)
        preciot += tiempoLaser()
        preciot += preciot * 0.12

    }
    else if (valor == '4') {
        preciot = onlyMaterial()
        preciot += tiempocnc()
        preciot += preciot * 0.12
    }
    else if (valor == '5') {
        preciot = tiempoLaser()
        preciot += preciot * 0.12
    } else if (valor == '6') {
        preciot = tiempocnc()
        preciot += preciot * 0.12
    }
    var cantidadG = document.getElementById('inputCantidadG').value
    preciot = preciot * cantidadG
    console.log("PRECIO T = "+preciot.toFixed(0))
    //total += preciot
    var textTotal = total.toFixed(0)
    //inputCantidadG
    lprecio.textContent = "Precio: Q." + preciot.toFixed(0)
    //lprecioM.textContent = "Precio: Q." + textTotal
    var pprecio = document.getElementById('lprecioM').textContent[10]
    //Obtener los datos, desde la posicion 10 hasta la posicion 13 del texto
    var pprecio = document.getElementById('lprecioM').textContent.substring(10, 15)
    console.log(pprecio)
})

var preciot = 0

document.getElementById('btndescargar').addEventListener('click', () => {
    cotizacionPDF()
})
function onlyMaterial() {


    //ACRILICO NEGRO 3mm
    //var precioplancha = 475
    //PVC 3mm
    //var precioplancha = 130
    //PVC 6mm
    //var precioplancha = 160

    //ACRILICO transparente 3mm
    //var precioplancha = 450
    //ACRILICO transparente 6mm
    //var precioplancha = 830

    //MDF
    //var precioplancha = 165

    //MDF 1cm
    //var precioplancha = 200

    //MDF 1 pulgada
    //var precioplancha = 540
    //ACRILICO BLANCO 3mm
    //var precioplancha = 490


    //MADERA 1.2 por 2.4
    var precioplancha = 0
    //

    //MADERA 1.2 por 2.4 
    //Tiempo 4
    //10mm - 470 
    //12 - 570
    //12mm teca - 770 
    //16 - 610
    //30mm pino - 880 


    var selectMaterial = document.getElementById('selectMaterial').value
    var divisiones = 5
    if (selectMaterial == 0) {
        alert('Complete los campos')
    } else if (selectMaterial == "MDF 3mm") {
        //MDF 3mm
        var precioplancha = 120
        console.log("MDF 3MM")
    } else if (selectMaterial == "MDF 6mm") {
        //MDF 6mm
        var precioplancha = 175
    }
    else if (selectMaterial == "MDF 1cm") {
        //MDF 1 CM
        var precioplancha = 200
    } else if (selectMaterial == "MDF 1pulgada") {
        //MDF 1 pulgada
        var precioplancha = 540
    }
    else if (selectMaterial == "Acrílico transparente 3mm") {
        //Acrilico transparente 3mm
        var precioplancha = 450
    }
    else if (selectMaterial == "Acrílico transparente 6mm") {
        //Acrilico transparente 6mm
        var precioplancha = 830
    }
    else if (selectMaterial == "Acrílico negro 3mm") {
        //Acrilico negro
        var precioplancha = 475
    }
    else if (selectMaterial == "Acrílico blanco 3mm") {
        //Acrilico blanco
        var precioplancha = 490
    }
    else if (selectMaterial == "PVC 3mm") {
        //Acrilico PVC 3mm
        var precioplancha = 130
    }
    else if (selectMaterial == "PVC 6mm") {
        //PVC 6mm
        var precioplancha = 160
    }

    //IVA 12%
    var pdiv = precioplancha / divisiones
    var cm21 = 90 * 60
    var ancho = document.getElementById('inputancho').value
    var largo = document.getElementById('inputlargo').value
    var cantidad = document.getElementById('inputcantidad').value

    var lpreciou = document.getElementById('lpreciou')
    var lcm = document.getElementById('lcm')
    var cm = ancho * largo;
    lcm.textContent = "Cm2: " + cm + "cm."
    //var preciocm = 0.0208383    
    var preciocm = pdiv / cm21
    console.log(preciocm)
    var preciou = preciocm * cm
    lpreciou.textContent = "Precio: Q." + preciou.toFixed(2)
    console.log("PRECIO U "+preciou)
    if (preciou > 25) {
        var precioc = preciou * cantidad
        console.log("PRECIO C "+precioc)
        preciot =   precioc* 1.5
        console.log("PRECIO T "+preciot)
    } else {
        var precioc = preciou * cantidad
        console.log("PRECIO C "+precioc)
        preciot = precioc   * 2
        console.log("PRECIO T "+preciot)
    }

    return preciot

}

function tiempoLaser() {
    var tiempo = document.getElementById('inputtiempo').value
    if (tiempo == " ") {
        return 0
    } else {
        var preciotiempo = tiempo * 2.5
        console.log(preciotiempo)
        return preciotiempo

    }

}
//Funcion para tiempo de cnc el cual se multiplica tiempo * 5
function tiempocnc() {
    var tiempo = document.getElementById('inputtiempo').value
    if (tiempo == " ") {
        return 0
    } else {
        var preciotiempo = tiempo * 5
        console.log(preciotiempo)
        return preciotiempo
    }
}


function ganancia() {
    var tiempo = document.getElementById('inputtiempo').value
    if (tiempo == " ") {
        return 0
    } else {
        var preciotiempo = tiempo * 4
        console.log(preciotiempo)
        return preciotiempo
    }

}


//const storage = getStorage();

async function subir() {

    const ref1 = firebase.storage.ref()
    console.log(ref1)
    const file = document.querySelector('#photo').files[0]
    const name = new Date() + '-' + file.name
    if (file == null) {
        alert("Seleccione una imagen")
    } else {
        const metaData = {
            contentType: file.type
        }
        const task = ref.child(name).put(file, metaData)
        task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                console.log(url)
                alert('subido')
            })
    }

}

var materiales = []
var total = 0
//imprime un hola mundo en consola js
//cREAR FUNCION CLICK PARA EL BOTON CON EL ID btnagregar1
document.getElementById('btnagregar1').addEventListener('click', async () => {
    // subir()
    var material = []
    var pprecio = document.getElementById('lprecio').textContent.substring(10, 15)
    console.log(pprecio)
    var lprecioM = document.getElementById('lprecioM')
    
    
    console.log("Total " + total)
    //Evalua si el total no tiene decimales
    if (total % 1 == 0) {
        total = total
    } else {
        if(total >0){
            total = total.toFixed(0)
        }
        
    }
    lprecioM.textContent = "Precio: Q." + total
    //total += total + pprecio
    var selectMaterial = document.getElementById('selectMaterial').value
    var ancho = document.getElementById('inputancho').value
    var largo = document.getElementById('inputlargo').value
    var cantidad = document.getElementById('inputCantidadG').value
    var tiempo = document.getElementById('inputtiempo').value
    var descripcion = selectMaterial + " " + ancho + "x" + largo + "cm. En un tiempo de " + tiempo + " minutos"
    material.push(pprecio)
    material.push(cantidad)
    material.push(descripcion)
    
    materiales.push(material)
    console.log(material)
    console.log(materiales)
    total = total + parseInt(pprecio)
    var lprecioM = document.getElementById('lprecioM')
    lprecioM.textContent = "Precio: Q." + total

   mostrar(material)
    showMessage('Material agregado', 'correct')



})

//Crear funcion para eliminar un elemento de un array materiales
 function eliminar(material, tr,tr2,  tbody, tbody2, precio) {
    //Eliminar el registro del array
    materiales.pop(material)
    console.log(materiales)
    total = total - precio
    total = total.toFixed(0)
    console.log("Total " + total)
    //Eliminar el registro del tbody
    tbody.removeChild(tr)
    tbody2.removeChild(tr2)
    console.log("Esto es lo que queda " + materiales)
    var lprecioM = document.getElementById('lprecioM')
    lprecioM.textContent = "Precio: Q." + total
    //Mostrar mensaje de eliminacion exitosa
    showMessage('Material eliminado', 'correct')
    //Aproximar el total a ningun decimal
    
}
btnagregar1

//Funcion para recorrer el array materiales y mostrarlos en la tabla
function mostrar(material) {
    
    var tbody = document.getElementById('tbodyproducts')
    var tbody2 = document.getElementById('tbodyproducts2')
    //Eliminar los tbody
    tbody.innerHTML = ""
    tbody2.innerHTML = ""
    for (var i = 0; i < materiales.length; i++) {
        var tr = document.createElement('tr')
        var tr2 = document.createElement('tr')

        var td0 = document.createElement('td')
        var td1 = document.createElement('td')
        var td2 = document.createElement('td')
        var td3 = document.createElement('td')
        //Agrega otro td para encargado
        var td4 = document.createElement('td')
        var td5 = document.createElement('td')
        var td6 = document.createElement('td')

        var td01 = document.createElement('td')
        var td11 = document.createElement('td')
        var td21 = document.createElement('td')
        var td31 = document.createElement('td')
        var td41 = document.createElement('td')
        var td51 = document.createElement('td')
        var td61 = document.createElement('td')

        var button = document.createElement('button')
        button.setAttribute('class', 'btn btn-danger')
        button.setAttribute('type', 'button')
        button.setAttribute('id', 'eliminar')
        button.innerHTML = 'Eliminar'
        //Crear evento click para el boton eliminar

        var button2 = document.createElement('button')
        button2.setAttribute('class', 'btn btn-danger')
        button2.setAttribute('type', 'button')
        button2.setAttribute('id', 'eliminar')
        button2.innerHTML = 'Eliminar'
        

        td0.innerHTML = materiales[i][2]
        td1.innerHTML = materiales[i][1]
        td2.innerHTML = materiales[i][0]
        td3.appendChild(button)

        td01.innerHTML = materiales[i][2]
        td11.innerHTML = materiales[i][1]
        td21.innerHTML = materiales[i][0]

        var preciojk = materiales[i][0]
        td31.appendChild(button2)

        tr.appendChild(td0)
        tr.appendChild(td1)
        tr.appendChild(td2)

        tr2.appendChild(td01)
        tr2.appendChild(td11)
        tr2.appendChild(td21)
        tr2.appendChild(td31)
        button.addEventListener('click', function () {
            eliminar(material, tr,tr2, tbody, tbody2, preciojk)
        })
        button2.addEventListener('click', function () {
            eliminar(material, tr,tr2, tbody, tbody2, preciojk)
        }
        )
        tbody.appendChild(tr)
        tbody2.appendChild(tr2)
    }
}





//Crea funcion click para el boton con el id btnsubir gracias
document.getElementById('btnsubir').addEventListener('click', async () => {
    // subir()

    var pprecio = document.getElementById('lprecioM').textContent.substring(10, 15)
    console.log(pprecio)
    var selectMaterial = document.getElementById('selectMaterial').value
    var nombre = document.getElementById('inputnombre').value
    var descripcion = document.getElementById('inputdescripcion').value
    var proyecto = document.getElementById('selectProyecto').value
    var encargado = document.getElementById('selectEncargado').value
    var gestion = document.getElementById('selectGestion').value
    var fecha = document.getElementById('inputfecha').value
    //Ordenar fecha en formato dd/mm/aaaa
    var fecha = fecha.split('-').reverse().join('-')
    console.log(fecha)

    var newmaterial = {

    }
    //Recorrer el array de materiales y agregarlos en newmaterial
    for (var i = 0; i < materiales.length; i++) {
        newmaterial[i] = materiales[i]
    }
    console.log(newmaterial)
    //Recorrer newmaterial  

    console.log(pprecio)
    if (proyecto == '0' || nombre == " " || descripcion == " ") {
        showMessage('Complete todos los campos', 'r')
    } else {
        try {
            const docRef = doc(db, "admin", "contadorc");
            const docSnap = await getDoc(docRef);
            var nid = docSnap.data().contador
            console.log(materiales)
            const docData = {
                materiales: newmaterial,
                nombre: nombre,
                descripcion: descripcion,
                proyecto: proyecto,
                precio: total,
                calificacion: 0,
                encargado: encargado,
                fecha: fecha,
                pago: false,
                gestion: gestion

            };
            await setDoc(doc(db, "creados23",String(nid) ), docData);
            await updateDoc(doc(db, "admin", "contadorc"), {
                contador: nid + 1
            });
            showMessage('Cotizacion creada', 'correct')

        } catch (e) {
            console.log(e)
        }
        total = 0
        
    }
})
//crea una funcion para un boton


document.getElementById("btnadicional").addEventListener("click", function () {
    var inputMaterialA = document.getElementById("inputMaterialA").value;
    var inputCantidadA = document.getElementById("inputCantidadA").value;
    var inputPrecioA = document.getElementById("inputPrecioIA").value;
    var subtotal = inputCantidadA * inputPrecioA;
    var material = []
    material.push(subtotal)
    
    material.push(inputCantidadA)
    material.push(inputMaterialA)
    materiales.push(material)

    
    total = total + parseInt(subtotal)
    var lprecioM = document.getElementById('lprecioM')
    lprecioM.textContent = "Precio: Q." + total

   mostrar(material)
    showMessage('Material agregado', 'correct')

    

})



function showMessage(message, type = "correct") {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type === "correct" ? "green" : "red",
        },
        // onClick: function () { } // Callback after click
    }).showToast();
}


