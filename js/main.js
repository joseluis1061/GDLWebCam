(function(){
    "use strict";
    var regalo = document.getElementById("regalo");
    document.addEventListener('DOMContentLoaded',function(){
        /* Mapa================================================ */
        var map = L.map('mapa').setView([6.216431, -75.569125], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([6.216431, -75.569125]).addTo(map)
            .bindPopup('GDL WebCam. </br> La mejor conferencia web. </br> Entradas disponibles')
            .openPopup();
/*             .bindTooltip('Entradas disponibles');
            .openTooltip(); */

        /* ================================================ */  
        /* campos Datos de usuario */
        var nombre = document.querySelector("#nombre");
        var apellido = document.querySelector("#apellido");
        var email = document.querySelector("#email");

        /* campos Pases */
        var pase_dia = document.querySelector("#pase_dia");
        var pase_dosdias = document.querySelector("#pase_dosdias");
        var pase_completo = document.querySelector("#pase_completo");

        /* Botones y divs */
        var calcular = document.querySelector("#calcular");
        var errorDiv = document.querySelector("#error");
        var botonRegistro = document.querySelector("#btnRegistro");
        /* var resultado = document.querySelector("#lista_productos"); */
        var etiquetas = document.querySelector("#etiquetas");
        var camisas = document.querySelector("#camisa_evento");
        var lista_productos = document.querySelector("#lista-productos");
        var suma = document.querySelector("#suma-total");

        /* ================================================ */
        calcular.addEventListener("click", calcularMontos);
        function calcularMontos(event){
            event.preventDefault();
            
            if(regalo.value ===""){
                alert("Debes elegir un regalo");
                regalo.focus();
            }else{
                var boletosDia = (pase_dia.value);
                var boletos2dias= (pase_dosdias.value);
                var boletoCompleto = (pase_completo.value);               
                var cantidadCamisas = camisas.value;
                var cantidadEtiquetas = (etiquetas.value);

                var totalPagar = (boletosDia*30) + (boletos2dias*45) + (boletoCompleto*50) + 
                (cantidadEtiquetas*10) + ((cantidadCamisas *10) - ((cantidadCamisas *10 )* 0.07));
                suma.innerHTML = "";
                suma.innerHTML += "$" + totalPagar.toFixed(2);


                var listadoProductos = [];
                if(boletosDia>=1){
                    listadoProductos.push(boletosDia, " Pases por día");
                }
                if(boletos2dias >= 1){
                    listadoProductos.push(boletos2dias, " Pases por dos día");    
                }
                             
                if(boletoCompleto >=1){
                    listadoProductos.push(boletoCompleto, " Pases completos");
                }
                if(cantidadCamisas >=1){
                    listadoProductos.push(cantidadCamisas," Camisas");
                }      
                if(cantidadEtiquetas >=1){
                    listadoProductos.push(cantidadEtiquetas," Etiquetas");
                }          

                lista_productos.style.display="block";
                lista_productos.innerHTML = "";
                for(var i=0; i<listadoProductos.length; i++){
                    lista_productos.innerHTML += listadoProductos[i];
                    if((i%2) != 0){
                        lista_productos.innerHTML += "<br>";
                    }
                     
                }        
            }
        }

        /* ================================================ */
        pase_dia.addEventListener("blur", mostrarDias);
        pase_dosdias.addEventListener("blur", mostrarDias);
        pase_completo.addEventListener("blur", mostrarDias);
        var contenido_dia = document.querySelectorAll(".contenido-dia");
        function mostrarDias(){
            var dias =[];
            if(pase_dia.value>=1){
                dias.push("viernes");
                console.log("dia=",dias);
            }
            if(pase_dosdias.value>=1){
                dias.push("viernes","sabado");
                console.log("dia2=",dias);
            }
            if(pase_completo.value>=1){
                
                dias.push("viernes","sabado","domingo");
                console.log("completo=",dias);
            }
            document.querySelector("#viernes").style.display="none";
            document.querySelector("#sabado").style.display="none";
            document.querySelector("#domingo").style.display="none";
            for(var i=0; i<dias.length;i++){
                console.log(dias[i]);
                document.querySelector("#"+dias[i]).style.display="block";
                //document.getElementById(dias[i]).style.display="block";
            }
        }

        /* ================================================ */      

        nombre.addEventListener("blur", mensajeError);
        apellido.addEventListener("blur", mensajeError);
        email.addEventListener("blur", mensajeError);
        email.addEventListener("blur", validarEmail);

        function mensajeError(){            
            if(this.value === ""){
                errorDiv.style.display = "block";
                errorDiv.innerHTML = "Este campo es obligatorio";
                this.style.border = "1px solid red";
                errorDiv.style.border = "1px solid red";
                console.log("valor1:",this.innerHTML);
            }else{
                errorDiv.style.display = "none";
                this.style.border = "none";      
                errorDiv.style.border = "none";    
                console.log("valor2:",this.innerHTML);
            } 
        }
        
        function validarEmail(){
            if(email.value.indexOf("@") == -1){
                errorDiv.style.display = "block";
                errorDiv.innerHTML = "Este correro no es valido";
                this.style.border = "1px solid red";
                errorDiv.style.border = "1px solid red";
                console.log("valor1:",this.innerHTML);
            }
        }            
    });
}());

/* Inicio del documento para efectos*/
$(function(){

    //Lettering
    $(".nombre-sitio").lettering();
    

    //Programación de eventos
    $(".ocultar").hide();
    $(".programa-evento div:first").show();
    $(".menu-programa a:first").addClass("activo");
    $(".menu-programa a").on("click",function(){
        $(".info-curso").hide();
        $(".menu-programa a").removeClass("activo");
        var enlace = $(this).attr("href");
        $(this).addClass("activo");
        $(enlace).fadeIn(500);

        return false;
    });

    //Contador de numeros

    $(".resumen-evento li:nth-child(1) p").animateNumber({ number: 6 }, 1502);
    $(".resumen-evento li:nth-child(2) p").animateNumber({ number: 15 }, 1202);
    $(".resumen-evento li:nth-child(3) p").animateNumber({ number: 3 }, 1202);
    $(".resumen-evento li:nth-child(4) p").animateNumber({ number: 9 }, 1502);

    //Cuenta regresiva
    $(".cuenta-regresiva").countdown("2020/2/23", function(event) {
        $("#dias").html(event.strftime('%D'));
        $("#horas").html(event.strftime('%H'));
        $("#minutos").html(event.strftime('%M'));
        $("#segundos").html(event.strftime('%S'));
    });



});