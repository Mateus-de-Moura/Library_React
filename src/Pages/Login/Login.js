import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Style.css'
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

function Login() {

  const userId = "314159041659-ieqc0r9656ungpfe0osh8458v5ul7h58.apps.googleusercontent.com";
  const [nomeG, setNome] = useState();
  const [emailG, setEmail] = useState();
  const [senhaG, setSenha] = useState();
  const [fotog, SetFoto] = useState();


  gapi.load("client:auth2", () => {
    gapi.auth2.init({ clientId: userId })
  })


  function redirect() {
    window.location.href = "/Registre";
  }

  localStorage.removeItem("Logado");
  window.onload = function () {
    const btn = document.getElementById('enviar');
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      Logar();
    });
  };

  function Logar() {
    var nome = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    axios.post('https://localhost:44395/User/Login', {
      email: nome,
      senha: senha
    })
      .then((response) => {
        window.location.href = "/Home";
        if (response.status === 400) {
          alert("Login ou senha incorretos")
        }
        else {
          var usuario = 'logado';
          var token = response.data
          token = token.split(":");         
          localStorage.setItem('IdUser', token[2].trim());
          localStorage.setItem('Logado', usuario);
          localStorage.setItem("Token", token[1].trim());

          window.location.href = "/Home";
        }
      }).catch((error) => {
        const erro = document.querySelector("#erro");
        erro.innerHTML = "<br><div id='erro' style={display:none} class='alert alert-warning alert-dismissible fade show' role='alert'><strong>Erro!</strong> Verifique se o email e senha estão corretos.<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div>"
      })

  }
  const responseGoogle = (responsee) => {
    const { profileObj: { name, email, googleId, imageUrl } } = responsee;

    setNome(name);
    setEmail(email);
    setSenha(googleId);
    SetFoto(imageUrl);

    axios.post('https://localhost:44395/User/Register/Google', {
      nome: nomeG,
      email: emailG,
      senha: senhaG,
      perfil: 1,
      ativo: 1,
      base64Photo: fotog
    })
      .then((response) => {

        if (response.status === 400) {
          alert("Login ou senha incorretos")
        }
        else {
          var usuario = 'logado';
          var token = response.data;
          token = token.split(":");
          alert(token[3].trim());
          localStorage.setItem("perfil", token[3].trim());
          localStorage.setItem('IdUser', token[2].trim());
          localStorage.setItem('Logado', usuario);
          localStorage.setItem("Token", token[1].trim());

          window.location.href = "/Home";
        }
      })
  }

  return (


    <div class="login-form">
      <form>
        <div >
          <h2 class="text-center">Login</h2>

          <div class="form-group">
            <input id='email' type="text" class="form-control" placeholder="Email" required="required" />
          </div>
          <div class="form-group">
            <input id='senha' type="password" class="form-control" placeholder="Senha" required="required" />
          </div>

          <div class="form-group" id='check'>
            <br></br>
            <input type="checkbox" id="conect" />
            <label for="conect">Manter-me conectado</label>
          </div>
          <div id='erro'>

          </div>
          <div class="form-group">
            <button id='enviar' class="btn btn-primary btn-block">Entrar</button>
            <button onClick={() => redirect()} id='enviar' class="btn btn-secondary btn-block">Criar conta</button>
          </div>
          <div id='loginGoogle'>
            <GoogleLogin
              clientId="314159041659-ieqc0r9656ungpfe0osh8458v5ul7h58.apps.googleusercontent.com"
              buttonText="Continuar com Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </div>
      </form>
    </div>

  )
}

export default Login;