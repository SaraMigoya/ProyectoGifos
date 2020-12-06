
arrayFavoritos= localStorage.getItem("arrayFavoritos")
arrayFavoritos = JSON.parse(arrayFavoritos)

arrayFavNom = localStorage.getItem("arrayFavNom")
arrayFavNom = JSON.parse(arrayFavNom)

arrayFavU = localStorage.getItem("arrayFavU")
arrayFavU = JSON.parse(arrayFavU)

arrayUserName = localStorage.getItem("arrayUserName")
arrayUserName = JSON.parse(arrayUserName)

arrayTitulos = localStorage.getItem("arrayTitulos")
arrayTitulos = JSON.parse(arrayTitulos)
//favoritos sin contenido


if (arrayFavoritos == "null" || arrayFavoritos.length == 0){ 
    let sinFavoritos = document.createElement("img")
    let divSinfav = document.getElementById("sin-contenido")
    let pSinFavoritos = document.getElementById("p-sin-contenido")
    sinFavoritos.src = "assets/icon-fav-sin-contenido.svg"
    let p = document.createElement("p")
    p.id = "p-sin-contenido"
    p.innerHTML = "¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"
    if (divSinfav) {

        divSinfav.appendChild(sinFavoritos)
        pSinFavoritos.appendChild(p)
    }


} else {


    if (arrayFavoritos.length < 13) {

        for (let i = 0; i < arrayFavoritos.length; i++) {

            let gridContainer = document.getElementById("div-fav")
            let imgFav = document.createElement("img")
            imgFav.src = arrayFavoritos[i]
            let divResultados = document.createElement("div")
            divResultados.id = "divResultados"

            // creo el div para el mousehover
            let divHover = document.createElement("div")
            divHover.id = "mouse"

            // creo los iconos de fav, download y exp
            let iconFav = document.createElement("img")
            let iconDownload = document.createElement("img")
            let iconMax = document.createElement("img")

            iconFav.id = "iconos"
            iconFav.className = "icon-fav"
            iconDownload.id = "iconos"
            iconMax.id = "iconos"

            iconFav.src = "./assets/icon-fav.svg"
            iconDownload.src = "./assets/icon-download.svg"
            iconMax.src = "./assets/icon-max-normal.svg"

            divHover.appendChild(iconFav)
            divHover.appendChild(iconDownload)
            divHover.appendChild(iconMax)


            divResultados.appendChild(imgFav)
            divResultados.appendChild(divHover)
            if(gridContainer)
            gridContainer.appendChild(divResultados)

            //evento eliminar fav
            iconFav.addEventListener("click", () => {

                let pos = arrayFavoritos[i];
                arrayFavoritos.splice(pos, 1)
                let remover = arrayFavoritos.splice(pos, 1)
                console.log(remover)

                gridContainer.removeChild(divResultados)
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))


            })

            //evento de descarga
            iconDownload.addEventListener("click", () => {

                downloadGif(arrayFavoritos[i])

            });


            // evento max
            iconMax.addEventListener("mouseover", () => {
                localStorage.setItem("img", arrayFavoritos[i])

               // localStorage.setItem("tituloImg", arrayFavNom[i])
                //localStorage.setItem("user", arrayFavU[i])
                

                iconMax.src = "./assets/icon-max-hover.svg"

                let a = document.createElement("a")
                a.href = "expandir.html"
                a.appendChild(iconMax)
                divHover.appendChild(a)

            });

            iconMax.addEventListener("click", () => {

                a.href = "expandir.html"

            });
        };

    }
    let btnCont = 0
    let btnCorte = 0

    if (arrayFavoritos.length > 12) {
        let divVerMas = document.getElementById("divVermas")
        let div = document.createElement("div")
      /*   divVerMas.appendChild(div)  */

        let buttonVermas = document.createElement("img")
        buttonVermas.id = "imagen-vermas"
        buttonVermas.src = "assets/CTA-ver-mas.svg"

        if (divVerMas)
            divVerMas.appendChild(div)
        div.appendChild(buttonVermas)



        for (let i = btnCont; i < 12; i++) {

            let gridContainer = document.getElementById("div-fav")
            let imgFav = document.createElement("img")
            imgFav.src = arrayFavoritos[i]
            
          

            if (gridContainer)
                gridContainer.appendChild(imgFav)
            let divResultados = document.createElement("div")
            divResultados.id = "divResultados"

            // creo el div para el mousehover
            let divHover = document.createElement("div")
            divHover.id = "mouse"

            // creo los iconos de fav, download y exp
            let iconFav = document.createElement("img")
            let iconDownload = document.createElement("img")
            let iconMax = document.createElement("img")

            iconFav.id = "iconos"
            iconFav.className = "icon-fav"
            iconDownload.id = "iconos"
            iconMax.id = "iconos"

            iconFav.src = "./assets/icon-fav.svg"
            iconDownload.src = "./assets/icon-download.svg"
            iconMax.src = "./assets/icon-max-normal.svg"

            divHover.appendChild(iconFav)
            divHover.appendChild(iconDownload)
            divHover.appendChild(iconMax)


            divResultados.appendChild(imgFav)
            divResultados.appendChild(divHover)
            if (gridContainer)
                gridContainer.appendChild(divResultados)
                
            //evento eliminar fav
            iconFav.addEventListener("click", () => {
                let pos = arrayFavoritos[i];
                arrayFavoritos.splice(pos, 1)
                gridContainer.removeChild(divResultados)
                localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))


            })
            //evento de descarga
            iconDownload.addEventListener("click", () => {

                downloadGif(arrayFavoritos[i])

            });
            // evento max
            iconMax.addEventListener("mouseover", () => {
                localStorage.setItem("img", arrayFavoritos[i])

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

        div.addEventListener("click", () => {
            btnCont += 12;
            btnCorte += (btnCont + 12)

            for (let i = btnCont; i < btnCorte; i++) {

                if (i >= arrayFavoritos.length) {
                    divVerMas.appendChild(div)
                    divVerMas.removeChild(div)

                } else {
                    let gridContainer = document.getElementById("div-fav")
                    let imgFav = document.createElement("img")
                    imgFav.src = arrayFavoritos[i]
                    
                    gridContainer.appendChild(imgFav)

                    if (gridContainer)
                        gridContainer.appendChild(imgFav)
                    let divResultados = document.createElement("div")
                    divResultados.id = "divResultados"

                    // creo el div para el mousehover
                    let divHover = document.createElement("div")
                    divHover.id = "mouse"

                    // creo los iconos de fav, download y exp
                    let iconFav = document.createElement("img")
                    let iconDownload = document.createElement("img")
                    let iconMax = document.createElement("img")

                    iconFav.id = "iconos"
                    iconFav.className = "icon-fav"
                    iconDownload.id = "iconos"
                    iconMax.id = "iconos"

                    iconFav.src = "./assets/icon-fav.svg"
                    iconDownload.src = "./assets/icon-download.svg"
                    iconMax.src = "./assets/icon-max-normal.svg"

                    divHover.appendChild(iconFav)
                    divHover.appendChild(iconDownload)
                    divHover.appendChild(iconMax)


                    divResultados.appendChild(imgFav)
                    divResultados.appendChild(divHover)
                    if (gridContainer)
                        gridContainer.appendChild(divResultados)
                        
                    //evento eliminar fav
                    iconFav.addEventListener("click", () => {
                        let pos = arrayFavoritos[i];
                        arrayFavoritos.splice(pos, 1)
                        gridContainer.removeChild(divResultados)
                        localStorage.setItem("arrayFavoritos", JSON.stringify(arrayFavoritos))


                    })
                    //evento de descarga
                    iconDownload.addEventListener("click", () => {

                        downloadGif(arrayFavoritos[i])

                    });
                    // evento max
                    iconMax.addEventListener("mouseover", () => {
                        localStorage.setItem("img", arrayFavoritos[i])

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
        })
    }



}
