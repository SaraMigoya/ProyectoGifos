

let carousel = document.getElementById("div-general")

//obtengo imagen del local storage para mostrar expandido
let img = document.getElementById("imagenesGifos")
let imagen = localStorage.getItem("img")
img.src = localStorage.getItem("img")
carousel.appendChild(img)




//Evento que descarga de imágenes
let download = document.getElementById("icon-download")

download.addEventListener("click", () => {
    
    downloadGif(localStorage.getItem("img"))
    
})


//guardo las imagenes en el local storage para obtenerlas en Favoritos

let iconFav = document.getElementById("icon-fav")


iconFav.addEventListener("click", () => {
    iconFav.src = "./assets/icon-fav-active.svg"
    if(localStorage.getItem("arrayFavoritos")) {
        let arrayFavoritos = localStorage.getItem("arrayFavoritos")
        arrayFavoritos = JSON.parse(arrayFavoritos)




        let fav = localStorage.getItem("fav")



        arrayFavoritos.push(`${fav}`)

  
        localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))

        
    }else{
        let arrayFavoritos = []
        let arrayFavNom = []
        let arrayFavU = []

        let fav = localStorage.getItem("fav")




        arrayFavoritos.push(`${fav}`)
        arrayFavU.push(`${u}`)
        arrayFavNom.push(`${nombre}`)

        localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos));

    }
    
});




//MODO NOCTURNO

if (localStorage.getItem("dark-mode") == "true") {
    document.body.classList.add("dark");
   
    let iconClose = document.getElementById("icon-close");
    iconClose.src = "assets/close-modo-noct.svg"
  


} else {
    document.body.classList.remove("dark");
    let iconClose = document.getElementById("icon-close");
    iconClose.src = "assets/close.svg"
    

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