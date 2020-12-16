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
    let trendingGifs = "https://api.giphy.com/v1/gifs/trending?api_key=YaOhho0nfvtDv9KxcBH64ng3iVX6VW9a&limit=12"
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

let iconFav1 = document.getElementById("icon-fav1")
let iconFav2 = document.getElementById("icon-fav2")
let iconFav3 = document.getElementById("icon-fav3")
let iconDownload1 = document.getElementById("icon-download1")
let iconDownload2 = document.getElementById("icon-download2")
let iconDownload3 = document.getElementById("icon-download3")
let iconMax1 = document.getElementById("icon-max1")
let iconMax2 = document.getElementById("icon-max2")
let iconMax3 = document.getElementById("icon-max3")


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
        imagenesGifos3.src = arrayImagenes[2];


        if (iconFav1)
        iconFav1.addEventListener("click", () => {
            iconFav1.src = "./assets/icon-fav-active.svg"

            if (localStorage.getItem("arrayFavoritos")) {
                let arrayFavoritos = localStorage.getItem("arrayFavoritos")
                arrayFavoritos = JSON.parse(arrayFavoritos)

                //let arrayTitulos = localStorage.getItem("arrayTitulos")
               // arrayTitulos = JSON.parse(arrayTitulos)
               localStorage.removeItem("tituloImg")
         
               localStorage.setItem("tituloImg", `${arrayTituloGifos[0]}`)

                arrayFavoritos.push(arrayImagenes[0])
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))



            } else {
                let arrayFavoritos = []

                arrayFavoritos.push(arrayImagenes[0])
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos));
            }
        });


        iconFav1.addEventListener("mouseover", () => {
            iconFav1.src = "./assets/icon-fav-hover.svg"
 
         });
 
         iconFav1.addEventListener("mouseleave", () => {
           iconFav1.src = "./assets/icon-fav.svg"
 
         });
        if (iconFav2)
        iconFav2.addEventListener("click", () => {
            iconFav2.src = "./assets/icon-fav-active.svg"

            if (localStorage.getItem("arrayFavoritos")) {
                let arrayFavoritos = localStorage.getItem("arrayFavoritos")
                arrayFavoritos = JSON.parse(arrayFavoritos)

               // let arrayTitulos = localStorage.getItem("arrayTitulos")
               // arrayTitulos = JSON.parse(arrayTitulos)


                arrayFavoritos.push(arrayImagenes[1])
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))


            } else {
                let arrayFavoritos = []

                arrayFavoritos.push(arrayImagenes[1])
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos));
            }
        });

        iconFav2.addEventListener("mouseover", () => {
            iconFav2.src = "./assets/icon-fav-hover.svg"
 
         });
 
         iconFav2.addEventListener("mouseleave", () => {
           iconFav2.src = "./assets/icon-fav.svg"
 
         });
        if (iconFav3)
        iconFav3.addEventListener("click", () => {
            iconFav3.src = "./assets/icon-fav-active.svg"

            if (localStorage.getItem("arrayFavoritos")) {
                let arrayFavoritos = localStorage.getItem("arrayFavoritos")
                arrayFavoritos = JSON.parse(arrayFavoritos)

              //  let arrayTitulos = localStorage.getItem("arrayTitulos")
               // arrayTitulos = JSON.parse(arrayTitulos)


                arrayFavoritos.push(arrayImagenes[2])
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))


            } else {
                let arrayFavoritos = []

                arrayFavoritos.push(arrayImagenes[2])
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos));
            }
        });

        iconFav3.addEventListener("mouseover", () => {
            iconFav3.src = "./assets/icon-fav-hover.svg"
 
         });
 
         iconFav3.addEventListener("mouseleave", () => {
           iconFav3.src = "./assets/icon-fav.svg"
 
         });

    
        //evento de descarga
        if (iconDownload1)
        iconDownload1.addEventListener("click", () => {
        downloadGif(arrayImagenes[0])
    
         });
         iconDownload1.addEventListener("mouseover", () => {
            iconDownload1.src = "./assets/icon-download-hover.svg"

        });

        iconDownload1.addEventListener("mouseleave", () => {
            iconDownload1.src = "./assets/icon-download.svg"

        });

        //evento de descarga
        if (iconDownload2)
        iconDownload2.addEventListener("click", () => {
            downloadGif(arrayImagenes[1])
        
        });
        iconDownload2.addEventListener("mouseover", () => {
            iconDownload2.src = "./assets/icon-download-hover.svg"

        });

        iconDownload2.addEventListener("mouseleave", () => {
            iconDownload2.src = "./assets/icon-download.svg"

        });
        //evento de descarga
        if (iconDownload3)
        iconDownload3.addEventListener("click", () => {
        downloadGif(arrayImagenes[2])
    
        });
        iconDownload3.addEventListener("mouseover", () => {
            iconDownload3.src = "./assets/icon-download-hover.svg"

        });

        iconDownload3.addEventListener("mouseleave", () => {
            iconDownload3.src = "./assets/icon-download.svg"

        });

        //evento expandir
        if(iconMax1)
           iconMax1.addEventListener("click", () => {
            localStorage.removeItem("img")
            localStorage.removeItem("tituloImg")
            localStorage.removeItem("user")

            localStorage.setItem("img", `${imagenesGifos1.src}`)
            localStorage.setItem("fav", `${imagenesGifos1.src}`)
            localStorage.setItem("tituloImg", `${arrayTituloGifos[0]}`)
            localStorage.setItem("user", `${arrayUser[0]}`)


        });
        iconMax1.addEventListener("mouseover", () => {
            iconMax1.src =  "./assets/icon-max-hover.svg"

        });

       iconMax1.addEventListener("mouseleave", () => {
            iconMax1.src = "./assets/icon-max-normal.svg"

        });
      
        if(iconMax2)
         iconMax2.addEventListener("click", () => {
            localStorage.removeItem("img")
            localStorage.removeItem("tituloImg")
            localStorage.removeItem("user")

            localStorage.setItem("img", `${imagenesGifos2.src}`)
            localStorage.setItem("fav", `${imagenesGifos2.src}`)
            localStorage.setItem("tituloImg", `${arrayTituloGifos[1]}`)
            localStorage.setItem("user", `${arrayUser[1]}`)

        });
        iconMax2.addEventListener("mouseover", () => {
            iconMax2.src =  "./assets/icon-max-hover.svg"

        });

       iconMax2.addEventListener("mouseleave", () => {
            iconMax2.src = "./assets/icon-max-normal.svg"

        });
        if(iconMax3)
        iconMax3.addEventListener("click", () => {
            localStorage.removeItem("img")
            localStorage.removeItem("tituloImg")
            localStorage.removeItem("user")

            localStorage.setItem("img", `${imagenesGifos3.src}`)
            localStorage.setItem("fav", `${imagenesGifos3.src}`)
            localStorage.setItem("tituloImg", `${arrayTituloGifos[2]}`)
            localStorage.setItem("user", `${arrayUser[2]}`)

        });
        iconMax3.addEventListener("mouseover", () => {
            iconMax3.src =  "./assets/icon-max-hover.svg"

        });

       iconMax3.addEventListener("mouseleave", () => {
            iconMax3.src = "./assets/icon-max-normal.svg"

        });


        arrayTituloGifos = [];
        resultado.data.forEach(element => {
            arrayTituloGifos.push(element.title)
        });

      
       // arrayUser = []

        //resultado.data.forEach(element => {
            //arrayUser.push(element.username)
       // })

       
 
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
   iconMax1.addEventListener("click", () => {
        localStorage.removeItem("user")
        localStorage.removeItem("tituloImg")

        localStorage.setItem("tituloImg", `${arrayTituloGifos[posicionActual]}`)
        localStorage.setItem("user", `${arrayUser[posicionActual]}`)

    });
    iconMax2.addEventListener("click", () => {
        localStorage.removeItem("user")
        localStorage.removeItem("tituloImg")

        localStorage.setItem("tituloImg", `${arrayTituloGifos[posicionActual + 1]}`)
        localStorage.setItem("user", `${arrayUser[posicionActual + 1]}`)

    });
    iconMax3.addEventListener("click", () => {
        localStorage.removeItem("user")
        localStorage.removeItem("tituloImg")

        localStorage.setItem("tituloImg", `${arrayTituloGifos[posicionActual + 2]}`)
        localStorage.setItem("user", `${arrayUser[posicionActual + 2]}`)

    });

    //evento de descarga
    iconDownload1.addEventListener("click", () => {
     downloadGif(arrayImagenes[posicionActual])

        });

        //evento de descarga
    iconDownload2.addEventListener("click", () => {
        downloadGif(arrayImagenes[posicionActual + 1])

        });
        //evento de descarga
    iconDownload3.addEventListener("click", () => {
        downloadGif(arrayImagenes[posicionActual + 2])

        });

    /*iconFav1.addEventListener("click", () => {
        iconFav1.src = "./assets/icon-fav-active.svg"

    
        if (localStorage.getItem("arrayFavoritos")) {
            let arrayFavoritos = localStorage.getItem("arrayFavoritos")
            arrayFavoritos = JSON.parse(arrayFavoritos)

            let arrayTitulos = localStorage.getItem("arrayTitulos")
            arrayTitulos = JSON.parse(arrayTitulos)


            arrayFavoritos.push(arrayImagenes[posicionActual])
            localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))

            //arrayTituloGifos.push(arrayImagenes[0])
            localStorage.setItem("tituloImg", JSON.stringify(arrayTituloGifos))

        } else {
            let arrayFavoritos = []

            arrayFavoritos.push(arrayImagenes[posicionActual])
            localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos));
        }
    });


    iconFav2.addEventListener("click", () => {
        iconFav2.src = "./assets/icon-fav-active.svg"

        if (localStorage.getItem("arrayFavoritos")) {
            let arrayFavoritos = localStorage.getItem("arrayFavoritos")
            arrayFavoritos = JSON.parse(arrayFavoritos)

            let arrayTitulos = localStorage.getItem("arrayTitulos")
            arrayTitulos = JSON.parse(arrayTitulos)


            arrayFavoritos.push(arrayImagenes[posicionActual + 1])
            localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))

            //arrayTituloGifos.push(arrayImagenes[0])
            localStorage.setItem("tituloImg", JSON.stringify(arrayTituloGifos))

        } else {
            let arrayFavoritos = []

            arrayFavoritos.push(arrayImagenes[posicionActual + 1])
            localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos));
        }
    });*/

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



 