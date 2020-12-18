//SECCIÓN 1 - COMUNICACIÓN CON LA API
let arrayTitulos;
let arrayGifos;
let arrayUserName;
let arrayVermas;
let input = document.getElementById("input")


let probando = document.getElementById("probando")


input.addEventListener("keyup", async (e) => {

    cerrarDiv("#divSugerencias")

    let textoIngresado = e.target.value
    let iconSearch = document.getElementById("icon-search");
    iconSearch.src = "assets/close.svg"

    if (textoIngresado.length == 0) {
        iconSearch.src = "assets/icon-search.svg"
        probando.classList.remove("buscador-expandido")
        return
    }

    //modifico el icono close a modo nocturno
    if (localStorage.getItem("dark-mode") == "true") {
        document.body.classList.add("dark");
        iconSearch.src = "assets/close-modo-noct.svg"

    } else {
        document.body.classList.remove("dark");
        iconSearch.src = "assets/close.svg"

    }

    //CREO LOS DIVS PARA LOS TITULOS SUGERIDOS
    let div = document.createElement("div")
    div.setAttribute("class", "div-search")
    div.setAttribute("id", "divSugerencias")
    probando.appendChild(div)

    // PUSHEO LAS IMÁGENES Y TITULOS DE LOS GIFOS EN LOS ARRAYS 
    let arrayCompletado = await autoCompletar(textoIngresado)
    arrayGifos = []
    arrayTitulos = []
    arrayUserName = []


    arrayCompletado.data.forEach(element => {
        arrayTitulos.push(element.title);
        arrayGifos.push(element.images.downsized.url);
        arrayUserName.push(element.username);
    })

    if (arrayTitulos.length == 0) return false;



    for (let i = 0; i < 4; i++) {

        if (arrayTitulos[i].toLowerCase().includes(textoIngresado.toLowerCase())) {

            let elementoLista = document.createElement("div")
            elementoLista.id = "lista"
            elementoLista.innerHTML = arrayTitulos[i]
            let imgsearch = document.createElement("img")
            imgsearch.id = "img-search"
            imgsearch.src = "assets/icon-search-copia.svg"
            probando.classList.add("buscador-expandido")

            div.appendChild(elementoLista)
            elementoLista.appendChild(imgsearch)

            elementoLista.addEventListener("click", () => {
                input.value = elementoLista.innerText;
                
                iconSearch.src = "assets/icon-search.svg"
                
                search();
            })
        }

        if (e.keyCode == 13) {
            search()
            iconSearch.src = "assets/icon-search.svg"
        }
    };
   

});


let numero = 0
async function autoCompletar(textoIngresado, numero) {

    try {

        let searchGifos = `https://api.giphy.com/v1/gifs/search?api_key=YaOhho0nfvtDv9KxcBH64ng3iVX6VW9a&q=${textoIngresado}&limit=12&offset=${numero}`;
        let autocompletado = await fetch(searchGifos);
        return autocompletado.json()
    }

    catch {
        alert("algo salió mal")
    }
}



//Función de búsqueda de gifos
function search() {

    cerrarDiv("#imagenes-resultantes")
    cerrarDiv("#div-vermas")
    cerrarDiv("#busqueda-sin-resultados")
    cerrarDiv("#otra-busqueda")
    cerrarDiv("#divResultados")
    probando.classList.remove("buscador-expandido")

    let divGifos = document.getElementById("div-gifos")
    let h2 = document.getElementById("h2")
    h2.innerHTML = input.value

    //CREO EL BOTÓN VERMAS
    let btnVerMas = document.getElementById("btn-vermas")
    let divVermas = document.createElement("div")
    divVermas.id = "div-vermas"
    let imgVerMas = document.createElement("img")
    imgVerMas.src = "./assets/CTA-ver-mas.svg"
    imgVerMas.id = "img-vermas"

    if (localStorage.getItem("dark-mode") == "true") {
        document.body.classList.add("dark");
        imgVerMas.src = "assets/CTA-ver+-modo-noc.svg"

    } else {
        document.body.classList.remove("dark");
        imgVerMas.src = "assets/CTA-ver-mas.svg"
    }


    btnVerMas.appendChild(imgVerMas)
    btnVerMas.append(divVermas) // qué es el append?
    divVermas.appendChild(imgVerMas)


    //CREO LAS IMAGENES DE GIFOS 
    for (let i = 0; i < arrayGifos.length; i++) {

        // creo el div para el mousehover

        let divResultados = document.createElement("div")
        divResultados.id = "divResultados"
        let imagenesGifos = document.createElement("img")
        imagenesGifos.src = arrayGifos[i]
        imagenesGifos.id = "imagenes-resultantes"

        // creo el div para el mousehover
        let divHover = document.createElement("div")
        divHover.className = "mouse"


        // creo los iconos de fav, download y exp
        let iconFav = document.createElement("img")
        let iconDownload = document.createElement("img")
        let iconMax = document.createElement("img")

        iconFav.id = "iconos"
        iconFav.className = "icon-fav"
        iconDownload.id= "iconos"
        iconMax.id = "iconos"

        iconFav.src = "./assets/icon-fav.svg"
        iconDownload.src = "./assets/icon-download.svg"
        iconMax.src = "./assets/icon-max-normal.svg"

        divHover.appendChild(iconFav)
        divHover.appendChild(iconDownload)
        divHover.appendChild(iconMax)


        divResultados.appendChild(imagenesGifos)
        divResultados.appendChild(divHover)
        divGifos.appendChild(divResultados)


        //evento que agrega a favoritos los gifos de la busqueda
        iconFav.addEventListener("click", () => {
            iconFav.src = "./assets/icon-fav-active.svg"


            if (localStorage.getItem("arrayFavoritos")) {
                let arrayFavoritos = localStorage.getItem("arrayFavoritos")
                arrayFavoritos = JSON.parse(arrayFavoritos)

                let arrayTitulos = localStorage.getItem("arrayTitulos")
                arrayTitulos = JSON.parse(arrayTitulos)


                arrayFavoritos.push(arrayGifos[i])
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))

                //arrayTitulos.push(arrayGifos[i])
                //localStorage.setItem("arrayTitulos", JSON.stringify(arrayTitulos))

            } else {
                let arrayFavoritos = []

                arrayFavoritos.push(arrayGifos[i])
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos));
            }
        });




        //evento de descarga
        iconDownload.addEventListener("click", () => {

            downloadGif(arrayGifos[i])
            iconDownload.src = "./assets/icon-download-hover.svg"

        });

        iconDownload.addEventListener("mouseover", () => {
            iconDownload.src = "./assets/icon-download-hover.svg"

        });

        iconDownload.addEventListener("mouseleave", () => {
            iconDownload.src = "./assets/icon-download.svg"

        });

        // evento max
        iconMax.addEventListener("mouseover", () => {

            localStorage.setItem("img", arrayGifos[i])
            localStorage.setItem("tituloImg", `${arrayTitulos[i]}`)
            localStorage.setItem("user", `${arrayUserName[i]}`)
            iconMax.src = "./assets/icon-max-hover.svg"


            let a = document.createElement("a")
            a.href = "expandir.html"
            a.appendChild(iconMax)
            divHover.appendChild(a)

        });

        iconMax.addEventListener("click", () => {

            a.href = "expandir.html"

        });
        iconMax.addEventListener("mouseleave", () => {

            iconMax.src = "./assets/icon-max-normal.svg"

        });

    }

    //RESULTADO SIN BÚSQUEDA
    if (arrayGifos.length == 0) {
        cerrarDiv("#div-vermas")
        probando.classList.remove("buscador-expandido")

        let sinResultados = document.createElement("img")
        sinResultados.id = "busqueda-sin-resultados"
        sinResultados.src = "assets/icon-busqueda-sin-resultado.svg"
        let otraBusqueda = document.createElement("p")
        otraBusqueda.id = "otra-busqueda"
        otraBusqueda.innerHTML = "intenta con otra búsqueda"
        let section = document.getElementById("section-resultados")
        let divSinResultado = document.getElementById("imagen-sin-resultado")
        divSinResultado.appendChild(sinResultados)
        section.appendChild(otraBusqueda)
    }

    //EVENTO QUE HABILITA EL BOTÓN VER MÁS
    imgVerMas.addEventListener("click", async () => {

        numero += 12
        arrayVermas = []
        let input = document.getElementById("input")
        let arrayCompletado = await autoCompletar(input.value, numero)

        arrayCompletado.data.forEach(element => {
            arrayVermas.push(element.images.downsized.url);
        })

        arrayVermas.forEach(element => {


            let imagenesGifos = document.createElement("img")
            imagenesGifos.src = element
            imagenesGifos.id = "imagenes-resultantes"
            divGifos.appendChild(imagenesGifos)

        })
    });

    cerrarDiv("#divSugerencias")



}


//Función que elimina los divs creados por cada sugerencia
function cerrarDiv(x) {
    let elementos = document.querySelectorAll(x)

    elementos.forEach(element => {
        element.parentNode.removeChild(element);
    })
}


//Evento que elimina todas las sugerencias con la cruz
iconSearch.addEventListener("click", () => {

    if (iconSearch.src = "./assets/close.svg") {

        cerrarDiv("#divSugerencias")
        probando.classList.remove("buscador-expandido")

    }


    //modifico el icono close a modo nocturno
    if (localStorage.getItem("dark-mode") == "true") {
        document.body.classList.add("dark");

        iconSearch.src = "assets/close-modo-noct.svg"



    } else {
        document.body.classList.remove("dark");

        iconSearch.src = "assets/close.svg"

    }
});
