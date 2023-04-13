import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import NavBar from '../Navbar/NavBar'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IoIosStar } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './detail.css';

function Detail() {
  const { Id } = useParams();
  const [livro, setLivro] = useState();
  const [lvCategorias, setCategorias] = useState();

  useEffect(() => {
    axios.get(`https://localhost:44395/Book/${Id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("Token")
      }
    }).then((response) => {
      setLivro(response.data);
      console.log(response.data);
      CarregaCategoriasRelacionadas();
    });

  }, []);

  function CarregaCategoriasRelacionadas() {
    axios.get(`https://localhost:44395/Book/Category/${Id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("Token")
      }
    })
      .then((response) => {
        console.log(response.data);
        setCategorias(response.data);

      }).catch(
    );
  }

  function redirec(id){   
    window.location.href = `/Detail/${id}`;    
  }

  function Compra(id, idUsuario, idlivro){  
   var IdUser =  localStorage.getItem("IdUser") ;
    
    axios.post(`https://localhost:44395/Cart/AddNewIten`, {         
         idUsuario: IdUser,
         idlivro: Id
    }, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
    })
      .then((response) => {       
         document.querySelector("#itencarrinho").innerHTML = `${response.data}`; 
        window.location.href = '/Car';
        <Link to="/Car"/>      

      }).catch(
       
        window.location.href = '/Car'
          
    );
  }

  return (
    <>
      <NavBar />

      {livro?.map(l => {
        return <div className='container'>
          <div id='row'>
            <img id='imagemprincipal' src={l.urlImagem} />
            <div id='descricao'>
              <p>Livro</p>
              <h5>{l.titulo}</h5>
              <p id='nameAutor'>{l.autor}</p>
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <IoIosStar />
              <p>4 de 5 estrelas</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam orci nisl, volutpat pellentesque tristique ut, efficitur eu tellus. Cras mollis pulvinar ipsum, vitae vehicula ex commodo lobortis. Aenean molestie fringilla mi. Praesent eleifend nibh at varius faucibus. Ut dignissim diam ac rutrum condimentum. </p>
              <div id='botoesAcao'>
                <Button id='btnAvaliacao' variant="primary">
                  <IoIosStar />
                  Ler Avaliações
                </Button>

                <Button id='btnfavoritos' variant="primary">
                  <AiFillHeart />
                  Adicionar a lista
                </Button>
              </div>
            </div>

            <div className='Compra'>
              <Card id='cardcompra' style={{ width: '25rem' }}>
                <Card.Body>
                  <p id='MenorPreco'>Menor preço</p>
                  <div id='descript'>
                    <img style={{ width: '90px', height: '150px' }} src={l.urlImagem} />
                    <div id='descricaoLivro'>
                      <p id='tituloDesc'><strong>{l.titulo}</strong></p>
                      <p><strong>Editora:</strong> {l.editora}</p>
                      <p><strong>Tipo:</strong> Usado</p>
                      <div id='dtValor'>
                        <p><strong>Ano:</strong> 2007</p>
                        <h7>R$ {l.valor}</h7>
                      </div>
                    </div>
                  </div>
                  <Card.Title>
                    <div id='linha'></div>
                  </Card.Title>
                  <Card.Text>
                    <a href='#'>Calcular Frete</a>
                    <div id='localidadeVenda'>
                      <h7><strong>Vendido Por:</strong> {l.editora}</h7>
                      <h7><strong>SP - São Paulo</strong></h7>
                    </div>
                  </Card.Text>
                  <Button id='btnComprar' onClick={()=>{Compra(l.Idlivro,1,1)}} type='submit' variant="primary">Comprar</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      })}

      <Container fluid>
        <Row>
          <Col>
            <section id='categorias'>
              <h5>Mesmo Genero</h5>
              <div class="CardsDescription">
                {lvCategorias?.map(l => {
                  return <div class="card" id="Cards">
                    <img class="card-img-top" src={l.urlImagem} alt="Card image cap" />
                    <div class="card-body">
                      <p class="card-title"><strong>{l.titulo.substring(0, 20)}</strong></p>
                      <p>{l.autor}</p>
                      <button type="button" onClick={()=>{redirec(l.id)} } class="btn btn-outline-primary">A partir de R$ {l.valor}</button>
                    </div>
                  </div>
                })}
              </div>
            </section>

          </Col>
        </Row>
      </Container>

    </>
  )
}

export default Detail