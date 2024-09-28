function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("aria-label", "le nom du photographe est " + name + " cliquer pour acceder au profil")

        const div = document.createElement('div');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h3 = document.createElement('h3');
        h3.textContent = city + ", " + country;
        const h4 = document.createElement('h4');
        h4.textContent = tagline;
        const h5 = document.createElement('h5');
        h5.textContent = price + "€/jour";

        article.appendChild(div);
        div.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);

        article.tabIndex = 0;


        article.addEventListener('click', function () {

            window.open("photographer.html?id=" + id, "_self")

        });

        article.addEventListener('keydown', function () {

            if (event.keyCode === 13) {
                window.open("photographer.html?id=" + id, "_self")
            }

        });



        return (article);
    }

    return { name, picture, getUserCardDOM }
}

