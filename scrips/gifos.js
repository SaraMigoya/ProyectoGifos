let arrayMisGifos = []
let arrayTitulos = []
let arrayUserName = []

if (localStorage.getItem("arrayId")){
    var arrayId = localStorage.getItem("arrayId")
    arrayId = JSON.parse(arrayId)
}else{
    var arrayId = []
}


 if(arrayId == "null" || arrayId.length == 0) {
    let sinGifos = document.createElement("img")
    let divSinGifos = document.getElementById("sin-contenido")
    let pSinGifos = document.getElementById("p-sin-contenido")
    sinGifos.src = "assets/icon-mis-gifos-sin-contenido.svg"
    let p = document.createElement("p")
    p.id = "p-sin-contenido"
    p.innerHTML = "¡Anímate a crear tu primer GIFO!"
    if (divSinGifos) {

        divSinGifos.appendChild(sinGifos)
        pSinGifos.appendChild(p)
    }
 } else{
    main()
 }

async function main() {
    

    for (let i = 0; i < arrayId.length; i++) {

        let resultado = await misGifos(arrayId[i]);
        arrayMisGifos.push(resultado.data[0].images.downsized.url)
        arrayTitulos.push(resultado.data[0].title)
        arrayUserName.push((resultado.data[0].username))

        let grid = document.getElementById("div-grid")
        let imgGifos = document.createElement("img")
        imgGifos.src = arrayMisGifos[i]
        

  
        let divResultados = document.createElement("div")
        divResultados.id = "divResultados"

        // creo el div para el mousehover
        let divHover = document.createElement("div")
        divHover.id = "mouse"

        // creo los iconos de fav, download y exp
        let iconTrash = document.createElement("img")
        let iconDownload = document.createElement("img")
        let iconMax = document.createElement("img")

        iconTrash.id = "iconos"
        iconTrash.className = "icon-fav"
        iconDownload.id = "iconos"
        iconMax.id = "iconos"

        iconTrash.src = "./assets/icon-trash-normal.svg"
        iconDownload.src = "./assets/icon-download.svg"
        iconMax.src = "./assets/icon-max-normal.svg"

        divHover.appendChild(iconTrash)
        divHover.appendChild(iconDownload)
        divHover.appendChild(iconMax)


        divResultados.appendChild(imgGifos)
        divResultados.appendChild(divHover)
        if(grid)
        grid.appendChild(divResultados)
        

        //evento eliminar fav
        iconTrash.addEventListener("click", () => {

            let pos = arrayId[i];
            
            let remover = arrayId.splice(pos, 1)
            console.log(remover)

            grid.removeChild(divResultados)
            localStorage.setItem("arrayId", JSON.stringify(arrayId))


        })

        //evento de descarga
        iconDownload.addEventListener("click", () => {

            downloadGif(arrayFavoritos[i])

        });


        // evento max
        iconMax.addEventListener("mouseover", () => {
            localStorage.setItem("img", arrayMisGifos[i])

            localStorage.setItem("tituloImg", arrayTitulos[i])
            localStorage.setItem("user", arrayUserName[i])
            iconMax.src = "./assets/icon-max-hover.svg"

            let a = document.createElement("a")
            a.href = "expandir.html"
            a.appendChild(iconMax)
            divHover.appendChild(a)

        });

        iconMax.addEventListener("click", () => {

            a.href = "expandir.html"

        });



    }

}




async function misGifos(ids) {

    for (let i = 0; i < arrayId.length; i++) {

        try {
            let gifById = `http://api.giphy.com/v1/gifs?api_key=YaOhho0nfvtDv9KxcBH64ng3iVX6VW9a&ids=${ids}`

            let response = await fetch(gifById);
            return response.json()
                .catch(error => { console.log(error) })

        }
        catch (error) {
            console.log("entro por error", error)
        }
    }

}











