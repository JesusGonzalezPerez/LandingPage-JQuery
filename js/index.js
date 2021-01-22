var cont = 0;
var cont2= 0;
var vistaTabla = false;


//Realiza la petición AJAX para cargar los servicios del JSON
function cargar1() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            maquetaServicios(JSON.parse(this.responseText));
        }
    };

    xhttp.open("GET", "json/json.txt", true);
    xhttp.send();
}


//Realiza la petición AJAX para cargar los testimonios del JSON
function cargar2() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (vistaTabla == false) {
                maquetaComentarios(JSON.parse(this.responseText));
            } else {
                maquetaComentariosTabla(JSON.parse(this.responseText));
            }
        }
    };

    xhttp.open("GET", "json/json.txt", true);
    xhttp.send();
}


//Maqueta los servicios
function maquetaServicios(objetoJSON) {
    //Estilos para el div que contiene los servicios
    var stylesServices = {
        backgroundColor: "#2b475f",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "space-around"
    };
    //Estilos para cada contenedor individual que contiene un servicio
    var stylesSubService = {
        border: "black solid 1px",
        height: "15rem",
        borderRadius: "1rem",
        padding: "1rem",
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#3d688c",
        width: "22rem",
    };

    for (var i = cont; i < objetoJSON.services.length; i++) {
        var div = $("<div>");
        $(div).attr("id", cont + 1);
        $(div).css(stylesSubService);

        //Crea un div dentro del div que contiene el servicio
        var header = $("<div>");
        var stylesHeader = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            wordWrap: "break-word",
            width: "100%",
            marginBottom: "0.5rem"
        };
        header.css(stylesHeader);

        //Crea una imagen que contiene el icono que representa a cada servicio
        var img = $("<img>")
        img.attr("src", objetoJSON.services[i].img);
        var styleImg = {
            width: "5rem",
            height: "5rem",
            borderRadius: "2.5rem",
            border: "white solid 1px"
        };
        $(img).css(styleImg);
        $(header).append(img);

        //Crea un párrafo con el precio del servicio
        var precio = $("<p>");
        precio.append(objetoJSON.services[i].price);
        var stylePrice = {
            color: "tomato",
            fontSize: "2rem",
            width: "100%"
        };
        $(precio).css(stylePrice);
        $(header).append(precio);

        //Añade imagen y precio al subDiv
        $(div).append(header);

        //Crea una etiqueta párrafo que contiene el nombre del servicio
        var titulo = $("<p>");
        titulo.append(objetoJSON.services[i].title);
        var styleTitle = {
            alignText: "center",
            fontSize: "1.2rem"
        };
        $(titulo).css(styleTitle);
        $(div).append(titulo);

        //Crea una etiqueta párrafo que contiene la información del servicio
        var texto = $("<p>");
        texto.append(objetoJSON.services[i].text);
        var styleText = {
            alignText: "center",
            fontSize: "0.85rem"
        };
        $(texto).css(styleText);
        $(div).append(texto);


        $("#servicios").css(stylesServices);
        $("#servicios").append(div);


        cont++;
    }
}


//Maqueta los testimonios
function maquetaComentarios(objetoJSON) {
    //Borra el contenido del div testimonios e inicializa el cont a 0 cada vez que se llama a la función
    $("#testimonios").empty();
    cont2=0;

    //Se añade un h2 con el título del div
    $("#testimonios").append("<h2>Comentarios</h2>");

    //Estilos para el div que contiene los testimonios
    var stylesTestimonies = {
        backgroundColor: "#2b475f",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "space-around"
    };
    //Estilos para cada contenedor individual que contiene un testimonio
    var stylesSubTestimony = {
        border: "black solid 1px",
        height: "17rem",
        borderRadius: "1rem",
        padding: "1rem",
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#3d688c",
        width: "22rem",
    };

    //Bucle do-while para asegurar que genero 3 números aleatorios diferentes para que no se repitan los comentarios en una misma recarga
    do {
        var num1 = Math.round(Math.random() * (7));
        var num2 = Math.round(Math.random() * (7));
        var num3 = Math.round(Math.random() * (7));
    } while (num1 == num2 | num1 == num3 | num2 == num3);


    //Creo un array e introduzco los números aleatorios generados anteriormente
    var arrayNums = [];
    arrayNums.push(num1);
    arrayNums.push(num2);
    arrayNums.push(num3);

    //Bucle
    for (var i = 0; i < 3; i++) {
        //Crea un div con un id, y aplica estilos a este
        var div = $("<div>");
        $(div).attr("id", cont2 + 1);
        $(div).css(stylesSubTestimony);

        //Se crea subDiv dentro del div de cada testimonio
        var header = $("<div>");
        var stylesHeader = {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "2rem",
            wordWrap: "break-word",
            width: "100%",
            alignText: "center"
        };
        header.css(stylesHeader);


        //Crea una imagen, le aplica estilos, y la introduce en el subDiv
        var img = $("<img>")
        img.attr("src", objetoJSON.testimony[arrayNums[i]].img);
        var styleImg = {
            width: "5rem",
            height: "5rem",
            borderRadius: "2.5rem"
        };
        $(img).css(styleImg);
        $(header).append(img);

          //Crea un párrafo, le aplica estilos, y lo introduce en el subDiv
        var name = $("<p>");
        name.append(objetoJSON.testimony[arrayNums[i]].name);
        var styleName = {
            color: "white",
            fontSize: "1.3rem",
            alignText: "center",
            width: "100%",
            paddingTop: "1rem"
        };
        $(name).css(styleName);
        $(header).append(name);
        $(div).append(header);

        //Crea un párrafo con el comentario escrito por el usuario
        var texto = $("<p>");
        texto.append(objetoJSON.testimony[arrayNums[i]].text);
        var styleText = {
            color: "white",
            fontSize: "1.1rem",
            alignText: "center"
        };
        $(texto).css(styleText);
        $(div).append(texto);


         //Crea un párrafo con el la fecha del comentario
        var fecha = $("<p>");
        fecha.append(objetoJSON.testimony[arrayNums[i]].date);
        var styleFecha = {
            color: "#cecece",
            fontSize: "0.8rem",
            alignText: "center"
        };
        $(fecha).css(styleFecha);
        $(div).append(fecha);


        $("#testimonios").css(stylesTestimonies);
        $("#testimonios").append(div);

        cont2++;
    }

}


//Maqueta los testimonios en vista tabla
function maquetaComentariosTabla(objetoJSON) {
    $("#testimonios").empty();
    $("#testimonios").append("<h2>Comentarios</h2>");

    //Estilos
    var styleTable = {
        marginBottom: "2rem"
    };
    var styleTr = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        height: "7rem"
    };
    var styleTd = {
        border: "solid black 1px",
        width: "20rem",
        height: "7rem",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
    };
    var styleImg = {
        width: "5rem",
        height: "5rem",
        borderRadius: "1rem"
    };

    //Crear tabla
    var tabla = $("<table>");
    $(tabla).css(styleTable);


    //Bucle do-while para asegurar que genero 3 números aleatorios diferentes para que no se repitan los comentarios en una misma recarga
    do {
        var num1 = Math.round(Math.random() * (7));
        var num2 = Math.round(Math.random() * (7));
        var num3 = Math.round(Math.random() * (7));
    } while (num1 == num2 | num1 == num3 | num2 == num3);


    //Creo un array e introduzco los números aleatorios generados anteriormente
    var arrayNums = [];
    arrayNums.push(num1);
    arrayNums.push(num2);
    arrayNums.push(num3);

    //Bucle
    for (var i = 0; i < 3; i++) {
        //Crea un tr y le aplica estilos
        var tr = $("<tr>");
        $(tr).css(styleTr);

        //Imagen
        var img = $("<img>");
        img.attr("src", objetoJSON.testimony[arrayNums[i]].img);
        $(img).css(styleImg);

        //Celda con el nombre del usuario
        var tdName = $("<td>").append(objetoJSON.testimony[arrayNums[i]].name);
        $(tdName).css(styleTd);
        $(tdName).prepend(img);
        $(tr).append(tdName);

        //Celda con el comentario del usuario
        var tdText = $("<td>").append(objetoJSON.testimony[arrayNums[i]].text);
        $(tdText).css(styleTd);
        $(tr).append(tdText);

        //Celda con la fecha del comenatario
        var tdDate = $("<td>").append(objetoJSON.testimony[arrayNums[i]].date);
        $(tdDate).css(styleTd);
        $(tr).append(tdDate);

        //Añado el tr a la tabla y la tabla al div testimonios
        $(tabla).append(tr);
        $("#testimonios").append(tabla);

        cont++;
    }
}


//Alterna entre modo tabla o modo normal
function cambiarVista() {
    var verde = {
        backgroundColor: "#6FFF33"
    };
    var rojo = {
        backgroundColor: "tomato"
    };
    if (vistaTabla == false){
        vistaTabla = true;
        $("#btnVista").css(verde);
    }else{
        vistaTabla = false;
        $("#btnVista").css(rojo);
    }
}


//Valida los campos del formulario
function formulario() {
    let nombre = new RegExp('[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.-]{3,48}');
    let correo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let contraseña = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i;

    //Los inputs 2, 3 y 4 del formulario están deshabilitados al principio
    $("#emailForm").prop("disabled", true);
    $("#passForm1").prop("disabled", true);
    $("#passForm2").prop("disabled", true);

    //Función que habilita los inputs si el input anterior es rellenado correctamente
    $(document).ready(function () {
        $("input").keyup(function (e) {
            if (nombre.exec($('#nameForm').val())) {
                $("#emailForm").prop("disabled", false);
            } else {
                $("#emailForm").prop("disabled", true);
            }

            if (correo.exec($('#emailForm').val())) {
                $("#passForm1").prop("disabled", false);
            } else {
                $("#passForm1").prop("disabled", true);
            }

            if (contraseña.exec($('#passForm1').val())) {
                $('#passForm2').prop("disabled", false);
            } else {
                $("#passForm2").prop("disabled", true);
            }

            if ($('#passForm1').val() == $('#passForm1').val() && contraseña.exec($('#passForm2').val())) {
                $('#valido').css("background-color", "#6FFF33");
            }
        })
    })
}



window.onload = function () {
    formulario();
    cargar1();
    cargar2();
    setInterval(cargar2, 3000);
}

//El cambio de vista no es instantáneo, se necesita esperar a que cargue la petición AJAX para ver el cambio.