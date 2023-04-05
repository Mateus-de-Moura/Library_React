import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style.css'
import { Alert } from 'bootstrap';

function Login() {

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

        if (response.status === 400) {
          alert("Login ou senha incorretos")
        }
        else {
          var usuario = 'logado';
          var token = response.data;
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
          <div id='erro'>

          </div>
          <div class="form-group">
            <button id='enviar' class="btn btn-primary btn-block">Entrar</button>
            <Link to={"/Registre"}> <button id='enviar' class="btn btn-danger btn-block">Criar conta</button></Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;