import React from 'react';

import NavBar from '../Navbar/NavBar'
import Carrosel from '../Carroucel/Carrocel';
import Card from '../Cards/Card';

function Home() {  
  // window.onbeforeunload = function() {
  //   localStorage.removeItem("Logado");    
  //   return '';    
  // };
  return (
    <>
    <div className="Home">
    <NavBar/>
    <Carrosel/>
    <Card />
    </div>  
    </>
  )
}

export default Home