import React from 'react';
import { useEffect } from 'react';

import Nav from '../Navbar/NavBar'
import Carrosel from '../Carroucel/Carrocel';
import Card from '../Cards/Card';


function Home() {  
  // window.onbeforeunload = function() {
  //   localStorage.removeItem("Logado");    
  //   return window.location.href = "/";    


  return (
    <>
    <div className="Home">
    <Nav/>
    <Carrosel/>
    <Card />
 
    </div>  
    </>
  )
}

export default Home