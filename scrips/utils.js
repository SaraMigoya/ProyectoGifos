//MODO DARK 
let modoDark = document.querySelector("#btnDark");
let body = document.querySelector("body");
let logoNocturno = document.getElementById("logo-noc");
let iconSearch = document.getElementById("icon-search");
let btnGifos = document.getElementById("btn-gifos");
let sliderLeft = document.getElementById("sliderLeft")
let sliderRight = document.getElementById("sliderRight")
let verMas = document.getElementById("img-vermas")


//FUNCIÓN QUE CONTIENE EL MODO NOCTURNO
function modoNocturno() {

    modoDark.addEventListener("click", () => {
        let dark = document.body.classList.toggle("dark");

        //acá guardo la clase en modo nocturno
        if (dark) {
            localStorage.setItem("dark-mode", "true");

        } else {
            localStorage.setItem("dark-mode", "false");
        }
        //acá obtengo el estado actual en el que estamos navegando
         if (localStorage.getItem("dark-mode") == "true") {

            logoNocturno.src = "./assets/logo-mobile-modo-noct.svg"
            iconSearch.src = "./assets/icon-search-modo-noct.svg"

            btnGifos.src = "./assets/CTA-crar-gifo-modo-noc.svg"
            modoDark.innerHTML = "modo diurno"
            sliderLeft.src = "./assets/button-slider-left-md-noct.svg"
            sliderRight.src = "./assets/button-slider-right-md-noct.svg"
        

        }
        else {

            logoNocturno.src = "./assets/logo-mobile.svg"
            iconSearch.src = "./assets/icon-search.svg"

            btnGifos.src = "./assets/button-crear-gifo.svg"
            modoDark.innerHTML = "modo nocturno"
            sliderLeft.src = "./assets/button-slider-left.svg"
            sliderRight.src = "./assets/Button-Slider-right.svg"
           

        } 
    });

    if (localStorage.getItem("dark-mode") == "true") {
        document.body.classList.add("dark");
        logoNocturno.src = "assets/logo-mobile-modo-noct.svg"
        iconSearch.src = "assets/icon-search-modo-noct.svg"
        btnGifos.src = "assets/CTA-crar-gifo-modo-noc.svg"
        sliderLeft.src = "assets/button-slider-left-md-noct.svg"
        sliderRight.src = "assets/button-slider-right-md-noct.svg"
        
        modoDark.innerHTML = "modo diurno"


    } else {
        document.body.classList.remove("dark");
        logoNocturno.src = "assets/logo-mobile.svg"
        if(iconSearch)
            iconSearch.src = "assets/icon-search.svg"
        btnGifos.src = "assets/button-crear-gifo.svg"
        sliderLeft.src = "assets/button-slider-left.svg"
        sliderRight.src = "assets/Button-Slider-right.svg"
     
        modoDark.innerHTML = "modo nocturno"

    }
}

modoNocturno();



//SECCION 3 - TRENDINGS
//funcion que obtiene la información de los trendings y la convierte en json
async function insertarGifos() {
    let trendingGifs = "http://api.giphy.com/v1/gifs/trending?api_key=YaOhho0nfvtDv9KxcBH64ng3iVX6VW9a&limit=12"
    try {

        let response = await fetch(trendingGifs);
        return response.json()
    }
    catch (error) {
        console.log("entro por error", error)
    }
}

let arrayImagenes;
let arrayTituloGifos;
let arrayUser;

async function main() {

    arrayImagenes = []


    try {

        let resultado = await insertarGifos();

        
        for (let i = 0; i < 12; i++) {

            arrayImagenes.push(resultado.data[i].images.downsized.url)

        }

     
        let imagenesGifos1 = document.getElementById("imagenesGifos1");
        let imagenesGifos2 = document.getElementById("imagenesGifos2");
        let imagenesGifos3 = document.getElementById("imagenesGifos3");
        imagenesGifos1.src = arrayImagenes[0];
        imagenesGifos2.src = arrayImagenes[1];
        imagenesGifos3.src = arrayImagenes[2]; //cambiar nombre de arrayimagenes



    
        arrayTituloGifos = [];
        resultado.data.forEach(element => {
            arrayTituloGifos.push(element.title)
        });

      
        arrayUser = []

        resultado.data.forEach(element => {
            arrayUser.push(element.username)
        })

       
        imagenesGifos1.addEventListener("click", () => {
            localStorage.removeItem("img")
            localStorage.removeItem("tituloImg")
            localStorage.removeItem("user")

            localStorage.setItem("img", `${imagenesGifos1.src}`)
            localStorage.setItem("fav", `${imagenesGifos1.src}`)
            localStorage.setItem("tituloImg", `${arrayTituloGifos[0]}`)
            localStorage.setItem("user", `${arrayUser[0]}`)


        });
        imagenesGifos2.addEventListener("click", () => {
            localStorage.removeItem("img")
            localStorage.removeItem("tituloImg")
            localStorage.removeItem("user")

            localStorage.setItem("img", `${imagenesGifos2.src}`)
            localStorage.setItem("fav", `${imagenesGifos2.src}`)
            localStorage.setItem("tituloImg", `${arrayTituloGifos[1]}`)
            localStorage.setItem("user", `${arrayUser[1]}`)

        });
        imagenesGifos3.addEventListener("click", () => {
            localStorage.removeItem("img")
            localStorage.removeItem("tituloImg")
            localStorage.removeItem("user")

            localStorage.setItem("img", `${imagenesGifos3.src}`)
            localStorage.setItem("fav", `${imagenesGifos3.src}`)
            localStorage.setItem("tituloImg", `${arrayTituloGifos[2]}`)
            localStorage.setItem("user", `${arrayUser[2]}`)

        });
    }

    catch (error) {
        console.log("entro por catch", error)
    }
}

main();

//MOVER CARRUSEL

sliderLeft.addEventListener("click", () => {
    cambiarImagen(-1)
})

sliderRight.addEventListener("click", () => {
    cambiarImagen(1)
})


let posicionActual = 0

function cambiarImagen(numero) {

    posicionActual = posicionActual + numero

    if ((posicionActual + numero + 2) > arrayImagenes.length) return;

    if ((posicionActual + numero) < 0) posicionActual = 0;

    imagenesGifos1.src = arrayImagenes[posicionActual]
    imagenesGifos2.src = arrayImagenes[posicionActual + 1]
    imagenesGifos3.src = arrayImagenes[posicionActual + 2]


    //obtengo los titulos de los gifos expandidos
    imagenesGifos1.addEventListener("click", () => {
        localStorage.removeItem("user")
        localStorage.removeItem("tituloImg")

        localStorage.setItem("tituloImg", `${arrayTituloGifos[posicionActual]}`)
        localStorage.setItem("user", `${arrayUser[posicionActual]}`)

    });
    imagenesGifos2.addEventListener("click", () => {
        localStorage.removeItem("user")
        localStorage.removeItem("tituloImg")

        localStorage.setItem("tituloImg", `${arrayTituloGifos[posicionActual + 1]}`)
        localStorage.setItem("user", `${arrayUser[posicionActual + 1]}`)

    });
    imagenesGifos3.addEventListener("click", () => {
        localStorage.removeItem("user")
        localStorage.removeItem("tituloImg")

        localStorage.setItem("tituloImg", `${arrayTituloGifos[posicionActual + 2]}`)
        localStorage.setItem("user", `${arrayUser[posicionActual + 2]}`)

    });

}



//funcion de descarga
async function downloadGif(url) {

    let a = document.createElement('a');
    let response = await fetch(url);
    let file = await response.blob();
    a.download = 'myGif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();
}



 