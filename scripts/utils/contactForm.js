

//Fonction afficher modal

function displayModal() {

  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  const body = document.querySelector("body");
  modal.setAttribute("aria-hidden", "false");
  body.setAttribute("aria-hidden", "true");


  info();







  // Accessibilité à l'ouverture de la modal


  // add all the elements inside modal which you want to make focusable
  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal


  document.addEventListener('keydown', function (e) {
    let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) { // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else { // if tab key is pressed
      if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  });

  firstFocusableElement.focus();







}









// Fonction fermeture modal

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  const body = document.querySelector("body");
  modal.setAttribute("aria-hidden", "true");
  body.setAttribute("aria-hidden", "false");
}



const form = document.querySelector('form');


// Fonction Formulaire avec validation


function formulaire() {
  event.preventDefault();
  let validation = 0;

  // Balise Prénom

  let baliseprenom = document.getElementById("first");
  let prenom = baliseprenom.value;
  console.log(prenom);


  if (prenom.length < 2) {

    if (document.getElementById("name_alert")) {

    }
    else {
      let name_alert = document.getElementById("prenom");
      name_alert.insertAdjacentHTML('afterend', "<div id='name_alert'>Veuillez entrer 2 caractères ou plus pour le champ prénom</div>");
    }
  }

  else {
    if (document.getElementById("name_alert")) {
      document.getElementById("name_alert").remove();
    } else { }
    validation = validation + 1;
  }


  // Balise Nom

  let balisenom = document.getElementById("last");
  let nom = balisenom.value;
  console.log(nom);

  if (nom.length < 2) {

    if (document.getElementById("surname_alert")) {

    }
    else {
      let surname_alert = document.getElementById('nom');
      surname_alert.insertAdjacentHTML('afterend', "<div id='surname_alert'>Veuillez entrer 2 caractères ou plus pour le champ nom</div>");
    }

  }

  else {
    if (document.getElementById("surname_alert")) {
      document.getElementById("surname_alert").remove();
    } else { }
    validation = validation + 1;
  }

  // Balise Email

  let baliseemail = document.getElementById("email");
  let email = baliseemail.value;
  let emailRegexp = new RegExp("[a-z0-9]+@[a-z]+\.[a-z]{2,3}");
  let result = email.match(emailRegexp);
  console.log(email);


  if (email != result) {

    if (document.getElementById("email_alert")) {
    }
    else {
      let email_alert = document.getElementById('adressemail');
      email_alert.insertAdjacentHTML('afterend', "<div id='email_alert'>Veuillez vérifier le format de l'email</div>");
    }
  }

  else {
    if (document.getElementById("email_alert")) {
      document.getElementById("email_alert").remove();
    } else { }
    validation = validation + 1;
  }


  // Balise Message


  let balisemessage = document.getElementById("textarea");
  let message = balisemessage.value;
  console.log(message);


  if (message.length < 2) {

    if (document.getElementById("message_alert")) {
    }
    else {
      let message_alert = document.getElementById('message');
      message_alert.insertAdjacentHTML('afterend', "<div id='message_alert'>Veuillez entrer 2 caractères ou plus pour le champ message</div>");
    }
  }

  else {
    if (document.getElementById("message_alert")) {
      document.getElementById("message_alert").remove();
    } else { }
    validation = validation + 1;
  }



  if ((validation === 4)
  ) {
    closeModal();
    baliseprenom.value = "";
    balisenom.value = "";
    baliseemail.value = "";
    balisemessage.value = "";
  }
  else {

  }
  console.log(validation)
}


//Fonction pour afficher le nom dans le formulaire


function info() {

  async function getInfo() {
    const reponse = await fetch("scripts/pages/photographers.json");
    const infos = await reponse.json();

    check_id(infos);

  }

  getInfo();

  function check_id(infos) {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    let name = "";
    // let email="";


    for (let i = 0; i < infos.photographers.length; i++) {

      if (id == infos.photographers[i].id) {

        name = infos.photographers[i].name;
      }

    }

    let div = `
     <div class="contactez_moi">
      <h2>Contactez-moi : ${name}</h2>
      </div>
      `;

    document.getElementById("contact_text")
    contact_text.innerHTML = div


  }
}


// clavier

document.addEventListener("keydown", checkKey, false);


function checkKey(e) {
  console.log(e.keyCode);
  const modal = document.getElementById("contact_modal");

  if (modal.style.display == "block") {

    if (e.keyCode == '27') {
      closeModal();
    }
    else {

    }

  }

}