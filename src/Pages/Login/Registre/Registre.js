import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './styleR.css';

function CadastroUsuario() {  
  

  return (
    <form className='formulario' >
      <h2>Criar conta</h2>
      <input type="text" placeholder='Nome'/>
      <input type="text" placeholder='Email'/>
      <input type="text" placeholder='Senha'/>
      <input type="text" placeholder='Repetir a senha'/>

      <Button variant="primary">Cadastrar</Button>
     <Link to={"/"}><Button variant="secondary">Voltar</Button></Link>
    </form>
    
  );
  }

export default CadastroUsuario;