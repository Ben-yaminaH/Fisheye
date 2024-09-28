// Fonction parse Json

async function getPhotographers() {
  const reponse = await fetch("scripts/pages/photographers.json");
  const photographers = await reponse.json();

  check_id(photographers);

}

getPhotographers();

let price;


// Fonction recupération de L'Id par url

function check_id(photographers) {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  let name = "";
  let city = "";
  let country = "";
  let tagline = "";
  let portrait = "";



  for (let i = 0; i < photographers.photographers.length; i++) {

    if (id == photographers.photographers[i].id) {

      name = photographers.photographers[i].name;
      city = photographers.photographers[i].city;
      country = photographers.photographers[i].country;
      tagline = photographers.photographers[i].tagline;
      portrait = photographers.photographers[i].portrait;
      price = photographers.photographers[i].price;

    }

  }

  let div = `
    <div class="profil_info">
        <h2 aria-label="Le nom du photogrphe est ${name}">${name}</h2>
        <h3 aria-label="le photographe vient de ${city + country}">${city + ", " + country}</h3>
        <h4 aria-label="la devise du photographe est ${tagline}"> ${tagline}</h4>
        </div>

        <div class="profil_contact">
        <button class="contact_button" aria-label="Bouton d'ouverture du formulaire de contact" alt="Bouton d'ouverture du formulaire de contact" onclick="displayModal()">Contactez-moi</button>
        </div>

        <div class="profil_image">
        <img src="assets/photographers/${portrait}" aria-label="Photo de profil du photographe ${name}" alt="Photo de profil du photographe"></img>
        </div>
    </div>
    `;




  let photograph_header = document.querySelector(".photograph-header");
  photograph_header.innerHTML = div



  afficher_medias(name, photographers, id);

}


let photographer_array = [];
let photographer_name = "";



// Fonction affichage des médias

function afficher_medias(nom, json, valeur) {

  let nbr = -1;
  for (let i = 0; i < json.media.length; i++) {

    let photographerId = json.media[i].photographerId;
    let media = json.media[i];



    if (valeur == photographerId) {
      nbr = nbr + 1;
      createMediaElement(media, nom, nbr);
      photographer_array.push({ nom: nom, id: nbr, media: media });

    }

  }
  photographer_name = nom;



}

let somme_like = 0;



// Fonction creation des medias


function createMediaElement(media, name, numero) {


  let mediaElement;

  const container = document.createElement("div");
  container.classList.add("media-item");
  const title = document.createElement("h3");
  title.id = "title" + numero;
  title.textContent = media.title;


  const likes_div = document.createElement("div");
  likes_div.id = "like" + numero;

  const likes_text = document.createElement("h3");
  likes_text.textContent = media.likes;
  likes_text.id = "like_text" + numero;
  likes_div.appendChild(likes_text);


  let coeur = document.createElement('p');
  coeur.blur();
  coeur.id = "coeur" + numero;
  coeur.innerHTML = '<i class="fa-regular fa-heart" aria-hidden="true"></i>';
  likes_div.appendChild(coeur);


  // Encart avec les likes 

  somme_like = somme_like + media.likes;

  console.log(somme_like);
  document.getElementById("encart").innerHTML = "<div>" + somme_like + " <i class='fa-solid fa-heart' aria-hidden='true'></i> </div><div>" + price + "€/jour</div>";


  // Image ou video

  let type = "";

  if (media.image) {
    type = "image";
    mediaElement = document.createElement("img");
    mediaElement.src = `assets/photographers/SamplePhotos/${name}/${media.image}`;
    mediaElement.alt = media.title;

  } else if (media.video) {
    type = "video";
    mediaElement = document.createElement("video");
    mediaElement.src = `assets/photographers/SamplePhotos/${name}/${media.video}`;
    mediaElement.controls = true;


  }

  mediaElement.setAttribute("aria-label", "le nom du media est ")

  mediaElement.id = "media" + numero;

  container.appendChild(mediaElement);
  container.appendChild(title);
  container.appendChild(likes_div);
  const gallery = document.getElementById("media-gallery");
  gallery.appendChild(container);


  // lien pour ouverture de la lightbox

  container.tabIndex = 0;

  container.addEventListener('keydown', function () {

    if (event.keyCode === 13) {
      display_image(mediaElement.src, type, numero, title.textContent)
    }

    else if (event.keyCode === 32) {
      display_image(mediaElement.src, type, numero, title.textContent)
    }

  });


  document.getElementById("media" + numero).addEventListener('click', function () {
    display_image(mediaElement.src, type, numero, title.textContent);
  }, false);
  document.getElementById("title" + numero).addEventListener('click', function () {
    display_image(mediaElement.src, type, numero, title.textContent);
  }, false);


  // Incrémentation des coeurs  

  document.getElementById("like" + numero).addEventListener('click', function () {

    if (check_coeur(numero) == "0") {
      somme_like = somme_like + 1;

      document.getElementById("like_text" + numero).textContent = media.likes + 1;
      document.getElementById("encart").innerHTML = "<div>" + somme_like + " <i class='fa-solid fa-heart' aria-hidden='true'></i> </div><div>" + price + "€/jour</div>";

      document.getElementById("coeur" + numero).innerHTML = '<i class="fa-solid fa-heart" aria-hidden="true"></i>';
      // console.log(check_coeur(numero));
    } else { }



  }, false);
}


// Fonction de checkbox coeur


let liste_coeur = [];

function check_coeur(numero) {
  let existe = "0";


  for (let i = 0; i < liste_coeur.length; i++) {
    if (liste_coeur[i] === numero) {
      existe = "1";
    }

  }

  if (existe == "1") {

  } else {
    liste_coeur.push(numero)
  }

  return existe;

}



// Fonction de tri


function trier_gallery(option) {

  somme_like = 0;

  if (option == "popularity") {

    photographer_array.sort((a, b) => b.media.likes - a.media.likes);


  }
  else if (option == "title") {
    photographer_array.sort((a, b) => a.media.title.localeCompare(b.media.title));

  }
  else if (option == "date") {
    photographer_array.sort((a, b) => new Date(b.media.date) - new Date(a.media.date));
  }


  document.getElementById("media-gallery").innerHTML = "";



  for (let i = 0; i < photographer_array.length; i++) {


    createMediaElement(photographer_array[i].media, photographer_name, i);

  }


}




