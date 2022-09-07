document.getElementById("loginBtn").addEventListener("click", IniciarSesion);

async function IniciarSesion(){
    const email = document.getElementById('EmailTxt').value;
    const password = document.getElementById('PasswordTxt').value;

    if(email == '' || password == ''){
        alert("Llene los campos")
        return;
    }

    const response = await fetch('https://appgizlorecords.herokuapp.com/api/es/usuario/v1/'+email+'/'+password);
    const listUsers = await response.json();

    if (response.status !== 200){
        alert("Error password o correo incorrecto")
        return;
    } else if(response.status == 200){
        alert("Bienvenido "+listUsers.nombreCompleto+", inicio de sesion exitoso")
        window.location.href = 'html/users.html'
    }
       
}