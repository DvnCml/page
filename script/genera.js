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
        function usrCll() {
            contenedorusr.innerHTML =`
            <div class="imgCont">
                <div>
                <img src="${data.usr[0].img}" alt="imagen de usuario">
                </div>
            </div>
            <h2>${data.usr[0].nombre}</h2>
            <p>${data.usr[0].descripcion}</p>
            `;
        }

        usrCll(); //funcion de items  usr

        //Creacion div para los botnoes de red social
        const socialDiv = document.createElement('div');
        socialDiv.id = 'socialDivId';
        socialDiv.classList ='socialDiv'

        contenedorusr.appendChild(socialDiv);

        //creacion elementos Social usando for each encapsulado en containerusr
        data.social.forEach(item =>{
            const socialBtn = document.createElement("a");
            socialBtn.href = `${item.Url}`

            socialBtn.innerHTML = `
                <img src="${item.Icon}" alt="imagen social" class = "imgContS"><span> ${item.Text} </span> 
            `;
            //contenedorusr.appendChild(socialBtn);
            socialDiv.appendChild(socialBtn);
        });

        //creacion elementos boton usando for each 
        data.boton.forEach(item =>{

            const boton = document.createElement("a");
            boton.href = `${item.link}`; //editamos el atributo href
            boton.innerHTML = `
                <img src="${item.Icon}" alt="imgBoton" class="imgContB"><span class="texto-btn">${item.Text}</span>
            `;
            contenedorBoton.appendChild(boton);
        });

        // tarjetas
        data.tarjeta.forEach(item => {
            const tarjeta = document.createElement("div");
            tarjeta.classList= 'tarjeta';

            tarjeta.innerHTML = `             
            <h3><img src="${item.icon}" alt="imgtitulo" class="imgContT">${item.titulo}</h3>
            <p>${item.descripcion}</p>
            <a href="${item.link}" target="_blank">Ver más</a>
            `;

            contenedorTjts.appendChild(tarjeta);
    });
    })
    .catch(error => console.error("Error al procesar JSON:", error));