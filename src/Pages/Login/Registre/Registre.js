import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './styleR.css';
import { AiOutlineUserAdd } from "react-icons/ai";


function CadastroUsuario() {
  const [foto, SetFoto] = useState();

  function Cadastrar() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    axios.post('https://localhost:44395/User/Register', {

      Nome: nome,
      email: email,
      senha: senha,
      Perfil: 1,
      Ativo: 1,
      Base64Photo: foto
    })
      .then((response) => {
        alert("Usuario Cadastrado");
        window.location.href = "/";
      })
  };

  window.onload = function () {
    var imagem = "";
    var file = document.querySelector("#foto");

    file.addEventListener('change', function (e) {
      const reder = new FileReader();
      reder.addEventListener('load', () => {
        imagem = reder.result;
        document.querySelector("#noImage").style.display = 'none';
        document.querySelector("#image").style.backgroundImage = `Url(${imagem})`;
        document.querySelector("#image").style.backgroundImage = `Url(${imagem})`;
        SetFoto(imagem);
      });
      reder.readAsDataURL(this.files[0]);
      console.log(imagem);
    });
  }
  return (
    <div id='container'>
      <form className='formulario' >
        <h2>Criar conta</h2>
        <div id='image' backgroundImage="./userFoto.jpeg" >
          <div id='noImage' >
            <h4 >No Image</h4>

          </div >

        </div>
        <div>
          <label for="foto" id='teste'>Escolher arquivo</label>
          <input type='file' id='foto' name="arquivo" />
        </div>
        <input type="text" id='nome' placeholder='Nome' />
        <input type="text" id='email' placeholder='Email' />
        <input type="password" id='senha' placeholder='Senha' />
        <input type="password" placeholder='Repetir a senha' />

        <Button id='cad' variant="primary" onClick={() => Cadastrar()}>Cadastrar</Button>
        <Link to={"/"}><Button variant="secondary">Voltar</Button></Link>
      </form>
    </div>
  );
}

export default CadastroUsuario;