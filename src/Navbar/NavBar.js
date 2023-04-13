import React, { useEffect, useState } from "react";
import './Style.css';
import { Navigate } from "react-router-dom";
import { BsFillCartCheckFill } from 'react-icons/bs';
import { CiSearch } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';

function Nav() {

  const [car, setCar] = useState();
  const [user, setUser] = useState();

  function getfoto() {  

      var Id = localStorage.getItem("IdUser");
      axios.get(`https://localhost:44395/User/${Id}`, {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("Token")
        }
      })
        .then((response) => {
          console.log(response.data);
          document.querySelector("#fotoUser").style.backgroundImage = `Url(${response.data.base64Photo})`;     
        }).catch(
      );
    
  };

  var Id = localStorage.getItem("IdUser");
  axios.get(`https://localhost:44395/Cart/GetCart/${Id}`, {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem("Token")
    }
  })
    .then((response) => {
      document.querySelector("#itencarrinho").innerHTML = `${response.data.length}`;
      getfoto();
    }).catch(
  );
  function logout() {
    localStorage.removeItem("perfil");
    window.location.href = "/";
  }

  return (
    <nav class="navbar navbar-light bg-dark">
      <div id="divhome">
        <Link to={"/Home"}><button id="home">
          Home
          <AiFillHome />
        </button>
        </Link>
      </div>

      <div className="Logout">
        <a href="/Car">
          <BsFillCartCheckFill />
          <a id="itencarrinho">
          </a>
        </a>
        <input id="inputBusca" placeholder="Pesquisar Livro" />
        <button id="btnBuscar"  ><CiSearch /></button>

        <div id="fotoUser" for="drop"> </div>

        <Dropdown id="drop">
          <Dropdown.Toggle id="dropdown-basic">
          </Dropdown.Toggle>
          <Dropdown.Menu id="DropMenu">
            {localStorage.getItem("perfil") === '1' ? <Dropdown.Item href="#/action-1">Administração</Dropdown.Item> : null}
            <Dropdown.Item href="#/action-1">Configurações</Dropdown.Item>
            <Dropdown.Item href="/Edit">Editar Usuario</Dropdown.Item>
            <Dropdown.Item onClick={() => logout()} >Sair</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


        {/* <a id="sair" href="/">Sair</a> */}
      </div>
    </nav>
  )
};

export default Nav;