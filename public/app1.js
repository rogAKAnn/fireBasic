
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDocs, getFirestore, collection, doc, addDoc , deleteDoc, query, where} 
  from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkFBxfdv-7hy3x-m67UDkqYYkk84fD95Y",
  authDomain: "fir-cafe-d78aa.firebaseapp.com",
  projectId: "fir-cafe-d78aa",
  storageBucket: "fir-cafe-d78aa.appspot.com",
  messagingSenderId: "591647066887",
  appId: "1:591647066887:web:c4103fd18011b57dc153a2",
  measurementId: "G-4G1VCDD1D1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');


function renderCafe(elem) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');
  

  li.setAttribute('data-id',doc.id);
  name.textContent = elem.data().name;
  city.textContent = elem.data().city;
  cross.textContent = 'x';

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  cross.addEventListener('click', (e) => {
    e.stopPropagation(); 
    id = e.target.parentElement.getAttribute('data-id');
  });

}

const cafesRef = collection(db,"cafes");
const q = query(cafesRef,where("city","==","Tuy Hoa"));
const p = await getDocs(q);
p.forEach(elem => {
  console.log(elem.id, " => ", elem.data());
})


// Getting data and print it
const querySnapshot = await getDocs(collection(db, "cafes"));
querySnapshot.forEach(element => {
  renderCafe(element);
});


// Saving data from keyboard 
form.addEventListener('submit',(e) => {
	e.preventDefault();
	addDoc(collection(db,"cafes"), {
		name: form.name.value, city:form.city.value
	}) 
});



