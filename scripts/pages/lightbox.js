// Fonction affichage de la lightbox

let numero_actuel = "";

function display_image(url, type, numero, title) {

  console.log(type);

  numero_actuel = numero;
  const titre = title.textContent;


  if (type == "image") {
    document.getElementById("src_media").innerHTML = "<img src='" + url + "'/><h1>" + title + "</h1>";

  }
  else if (type == "video") {
    document.getElementById("src_media").innerHTML = "<video src='" + url + "' controls=''></video><h1>" + title + "</h1>";

  }
  else { }

  const modal = document.getElementById("image_modal");
  modal.style.display = "block";

  const body = document.querySelector("body");
  modal.setAttribute("aria-hidden", "false");
  body.setAttribute("aria-hidden", "true");



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


// Fonction fermeture de la lightbox


function close_image() {
  const modal = document.getElementById("image_modal");
  modal.style.display = "none";
  const body = document.querySelector("body");
  modal.setAttribute("aria-hidden", "true");
  body.setAttribute("aria-hidden", "false");

}















//Fonction bouton droit


function right_media() {

  let numero = 0;
  let total = photographer_array.length - 1;



  if (numero_actuel < total) {
    numero = numero_actuel + 1;

  } else if (numero_actuel == total) {
    numero = 0;
  }


  let type = "";
  let image = "";

  if (photographer_array[numero].media.image) {

    type = "image";
    image = photographer_array[numero].media.image;
  }
  else if (photographer_array[numero].media.video) {

    type = "video";
    image = photographer_array[numero].media.video;
  }

  let name = photographer_name;
  let title = photographer_array[numero].media.title;
  let url = "assets/photographers/SamplePhotos/" + name + "/" + image;


  display_image(url, type, numero, title);

}


//Fonction bouton gauche


function left_media() {


  let numero = 0;
  let total = photographer_array.length - 1;



  if (numero_actuel > 1) {
    numero = numero_actuel - 1;

  } else if (numero_actuel == 0) {
    numero = total;
  }


  let type = "";
  let image = "";

  if (photographer_array[numero].media.image) {

    type = "image";
    image = photographer_array[numero].media.image;
  }
  else if (photographer_array[numero].media.video) {

    type = "video";
    image = photographer_array[numero].media.video;
  }

  let name = photographer_name;
  let title = photographer_array[numero].media.title;
  let url = "assets/photographers/SamplePhotos/" + name + "/" + image;


  display_image(url, type, numero, title);
}





//clavier ////

document.addEventListener("keydown", checkKey, false);


function checkKey(e) {
  console.log(e.keyCode);
  const modal = document.getElementById("image_modal");

  if (modal.style.display == "block") {

    if (e.keyCode == '37') {

      left_media();
    }
    else if (e.keyCode == '39') {
      right_media();
    }
    else if (e.keyCode == '27') {
      close_image();
    }
    else if (e.keyCode == '32') {
      close_image();

    }


  }

}
