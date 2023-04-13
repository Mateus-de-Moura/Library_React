import React, { useState, useEffect } from 'react'
import NavBar from '../Navbar/NavBar'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { TiDeleteOutline } from "react-icons/ti";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";


import './car.css';
import { redirect } from 'react-router-dom';

function Car() {

    const [LivroCompra, SetLivroCompra] = useState();
    useEffect(() => {
        if (document.querySelector("#itencarrinho").textContent === "0") {
            document.querySelector("#containerButons").style.display = 'none';
        }
        var Id = localStorage.getItem("IdUser");
        const IdUser = localStorage.getItem("IdUser")

        axios.get(`https://localhost:44395/Cart/GetCart/${Id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("Token")
            }
        })
            .then((response) => {
                console.log(response);
                SetLivroCompra(response.data);
                document.querySelector("#itencarrinho").innerHTML = `${response.data.length}`;

                if (response.status == 401) {
                    window.location.href = "/"
                }
            }).catch(
        );
    }, []);

    function DeleteIten(IdLivro) {
        axios.delete(`https://localhost:44395/Cart/DeleteItemCart/${IdLivro}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("Token")
            }
        })
            .then((response) => {
                window.location.href = "/Car"

            }).catch(
        );
    }

    function UpQuant(Id) {
        var quant = document.getElementById(`${Id}`).textContent;
        var valor = parseInt(quant) + 1;
        document.getElementById(`${Id}`).innerHTML = valor.toString();
        update(valor, Id);
    }

    function DownQuant(Id) {
        var quant = document.getElementById(`${Id}`).textContent;
        if (quant != "1") {
            var valor = parseInt(quant) - 1;
            document.getElementById(`${Id}`).innerHTML = valor.toString();
            update(valor, Id);
        }
    }
    function update(valor, IdCart) {

        axios.put(`https://localhost:44395/Cart/UpdateAmount`,
            {
                Quantidade: valor,
                Id: IdCart
            },
            {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem("Token") }
            })
    }
    return (
        <div id='container_Principal'>
            <NavBar />

            { /* grid principal */}
            {LivroCompra?.map(l => {
                return <Container fluid id='Container'>
                    <Row id='header'>
                        <Col>
                            <p>{l.titulo} - {l.estado}, {l.uf}</p>
                        </Col>
                    </Row>
                    <Row id='bodyCar'>
                        <Col >
                            <img src={l.urlImagem} />
                        </Col>
                        <Col id='descricaoCarrinhoLivro'>
                        <strong><p>{l.titulo}</p></strong>
                        <p>{l.autor}</p>
                        <p>Ano: {l.ano}</p>
                        <p>Idioma: {l.idioma}</p>
                        </Col>
                        <Col id='quntidade' >
                            <button onClick={() => DownQuant(l.id)}><FaCaretLeft /></button>
                            <strong><p id={l.id}>{l.quantidade}</p></strong>
                            <button onClick={() => UpQuant(l.id)}><FaCaretRight /></button>
                        </Col>
                    </Row>
                    <Row id='correio'>
                        <Col id='ColumnCorreio' >
                            <strong><p>ENTREGA BÁSICA</p></strong>
                            <strong><p id="Frete">Frete grátis.</p></strong>
                        </Col>
                        <Col >
                            <Row id='value'>
                                <p>Valor: R$ {l.valor}</p>

                            </Row>
                        </Col>
                        <Col>
                            <Row id='deleteIten'>
                                <button id='deleteItemCar' onClick={() => DeleteIten(l.id)}>
                                    <TiDeleteOutline />
                                </button>
                            </Row>
                        </Col>
                    </Row>

                </Container>
            })}

            { /* Botoes  */}
            {LivroCompra != null ? 
            <Container id='containerButons'>
                <Row id='total'>
                    <Col >
                        <Row>
                            <p>total </p>
                        </Row>
                    </Col>
                    <Col id='valorTotal'>
                        <Row>
                            <p>R$ 8,00 </p>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col id='escolher'>
                        <Button href='/Home' variant="secondary">ESCOLHER MAIS LIVROS</Button>
                    </Col>
                    <Col id='finalizar'>
                        <Button variant="danger">FINALIZAR PEDIDO</Button>
                    </Col>
                </Row>
            </Container>
           :<div></div> }

        </div>
    )
}

export default Car