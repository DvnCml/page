const BodyC = document.getElementById("BodyC");
const contenedorusr = document.getElementById("contenedorusr");
const contenedorBoton = document.getElementById("contenedorBoton");
const contenedorTjts = document.getElementById("contenedorTjts");

fetch("./data/data.json")

    .then(response => {
        if (!response.ok) {
            throw new Error("Error al cargar el JSON");
        }
        return response.json();
    })
    .then(data => {
        
        //console para depurar cargado del Json
        console.log("✅ JSON cargado:", data);
        console.log("🔍 tarjetas:", data.usr[0]);
        
        //creacion elementos usr encapsulado en una funcion
        contenedorusr.innerHTML =`
        <div class="imgCont">
            <div>
            <img src="${data.usr[0].img}" alt="imagen de usuario">
            </div>
        </div>
        <h2>${data.usr[0].nombre}</h2>
        <p>${data.usr[0].descripcion}</p>
        `;

        //Creacion div para los botnoes de red social
        const socialDiv = document.createElement('div');
        socialDiv.id = 'socialDivId';
        socialDiv.classList ='socialDiv'

        contenedorusr.appendChild(socialDiv);

        //creacion elementos Social usando for each encapsulado en containerusr
        data.social.forEach(item =>{
            const socialBtn = document.createElement("a");
            socialBtn.href = `${item.Url}`;
            /*socialBtn.setAttribute("onclick", `pendienteAlert()`);*/
            socialBtn.addEventListener("click", pendienteAlert);

            socialBtn.innerHTML = `
                <img src="${item.Icon}" alt="imagen social" class = "imgContS"><span> ${item.Text} </span> 
            `;
            //contenedorusr.appendChild(socialBtn);
            socialDiv.appendChild(socialBtn);
        });

        //creacion elementos boton usando for each 
        data.boton.forEach(item =>{
            const boton = document.createElement("a");
            /*boton.href = `${item.link}`; //editamos el atributo href*/
            boton.classList.add("botonMenu");
            boton.setAttribute("title", item.Text);
            /*boton.setAttribute("onclick", `filterTarjetas(event,"${item.Text}")`);*/
            boton.addEventListener("click", (event) => {
            filterTarjetas(event, item.Text);
            });

            boton.innerHTML = `
                <img src="${item.Icon}" alt="imgBoton" class="imgContB"><span class="texto-btn">${item.Text}</span>
            `;
            contenedorBoton.appendChild(boton);
            
        });

        // tarjetas
        data.tarjeta.forEach(item => {
            const tarjeta = document.createElement("div");
            tarjeta.classList= 'tarjeta';
            tarjeta.classList.add(`${item.class}`)

            tarjeta.innerHTML = `             
            <h3><img src="${item.icon}" alt="imgtitulo" class="imgContT">${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <a >Ver más</a>
            `;
            //se qutiro target blank a <a>
            contenedorTjts.appendChild(tarjeta);
        });

        //establecer primer boton como activo (esto despues de crear las tarjetas para que se apilique el filtro, dentro de la fucnion fetch para no interumpirce o crear error en el dom)
        const botonMenu = document.getElementsByClassName("botonMenu");
        botonMenu[0].click();
        
    })
    .catch(error => console.error("Error al procesar JSON:", error));

    function filterTarjetas (evt, botonName){
        const botonMenu = document.getElementsByClassName("botonMenu");
        for (i = 0; i < botonMenu.length; i++) {
            botonMenu[i].classList.remove("active");    //removiendo class active
        }
        
        const tarjetas= document.getElementsByClassName("tarjeta");
        for (i = 0; i < tarjetas.length; i++) {
            tarjetas[i].style.display = "none";
        }

        // recorrer lista de clase botonName para aplicar el display block
        const tarjetasFiltradas = document.getElementsByClassName(botonName);
        for ( j = 0; j < tarjetasFiltradas.length; j++) {
            tarjetasFiltradas[j].style.display = "block";
        }
        evt.currentTarget.classList.add("active");
    }   
    
    function pendienteAlert (){//remover al actualizar enlaces  y contnenido
        alert("elemento pendinete de agregar, pagina en proceso de desarrollo");
    }