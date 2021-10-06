function consultarDoctores(){
    $.ajax({    
            url : ' https://g56b6a1e2dc4932-db202109271649.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/doctor/doctor',
        //  data : { id : 123 },
            type : 'GET',
            dataType : 'json',
            
            error : function(xhr, status) {
                alert('ha sucedido un problema, '+xhr.status);
            },
            complete : function(xhr, status) {
                alert('Petición realizada, '+xhr.status);
            },
            success : function(json) {
                $("#resultado").empty();
                tabla = "<center><table border='1'><tr><th>ID<th>SPECIALTY<th>GRADUATE YEAR<th>DEPARTMENT_ID<th>NAME"
                filas = ""
                
                for(i = 0;  i < json.items.length; i++){
                    
                   filas += "<tr>"
                   filas +="<td>"+json.items[i].id  
                   filas +="<td>"+json.items[i].specialty
                   filas +="<td>"+json.items[i].graduate_year
                   filas +="<td>"+json.items[i].department_id
                   filas +="<td>"+json.items[i].name
                  
                }
                $("#resultado").append(tabla + filas)
                console.log(json.items[0])
            }
        });
}

 //fecha : $("#fecha").val(),
function guardar(){
    
$.ajax({    
    url : 'https://g56b6a1e2dc4932-db202109271649.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/doctor/doctor',
    data : { 
            
            name: $("#name").val(),
            specialty: $("#specialty").val(),
            graduate_year :  $("#year").val(),
            department_id: $("#department").val(),
    },
    type : 'POST',
    dataType: 'json',
    success : function(json, textStatus, xhr) {
        console.log("exito")
        console.log(json)
    },
    error : function(xhr, status) {
        console.log(xhr)
       console.log(status)
      
        
    },
    complete : function(xhr, status) {
        console.log(status)
       
    }
})
}


function buscarPorID(id){
    if(!validarCampo(id))
        alert("Primero ingrese un dato en el campo "+id.attr("id"))
    else{
        $.ajax({    
            url : 'https://g56b6a1e2dc4932-db202109271649.adb.sa-saopaulo-1.oraclecloudapps.com/ords/admin/doctor/doctor/'+id.val(),
            dataType : 'json',
            type : 'GET',
            dataType : 'json',
            success : function(json) {
                tabla = "<center><table border='1'>"
                filas =""
                if(json.items.length > 0){
                    console.log(json)
                    $("#resultado").empty();
                    filas +="<tr><th> ID:<td>"+json.items[0].id  
                    filas +="<tr><th>ESPECIALIDAD:<td>"+json.items[0].specialty
                    filas +="<tr><th>GRADUACION:<td>"+json.items[0].graduate_year
                    filas +="<tr><th>ID DEPARTAMENTO;<td>"+json.items[0].department_id
                    filas +="<tr><th>NOMBRE:<td>"+json.items[0].name
                    $("#resultado").append(tabla + filas+"</center>")  
                }
                else{
                    alert("Doctor con ID "+id.val()+" no existe")
                }
            },
            error : function(xhr, status) {
                alert('ha sucedido un problema'+ xhr.status);
            },
            complete : function(xhr, status) {
                alert('Petición realizada '+xhr.status);
            }
        });
    }
}

function validarCampo(campo){
    if(campo.val() != "")
        return true
    else
        return false;

}

function limpiarFormulario(){
    $("#nombre").val("");
    $("#valor").val("");
    $("#fecha").val("");
    $("#desc").val("");
    $("#user").val("");
}

function soloLectura(){
    $("#id").prop("readonly",false);
}