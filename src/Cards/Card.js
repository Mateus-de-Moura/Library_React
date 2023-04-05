import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './Style.css';

function Card() {
    const [livros, setLivros] = useState();    

    useEffect(() => {
        console.log(localStorage.getItem("Token"));
        axios.get("https://localhost:44395/Book/GetAll", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("Token")
            }})
            .then((response) => {
                console.log(response.data);
                setLivros(response.data);
                
            }).catch(

            );
    }, []);

    function redirec( Id){
        window.location.href = `/Detail/${Id}`;   
    }

    return (
        <>
            <h4 id='titulo'>Livros mais vendidos</h4>
            <section id='favoritos'>
                <div class="CardsDescription">
                    {livros?.map(l => {
                        return <div class="card" id="Cards">
                            <img class="card-img-top" src={l.UrlImagem} alt="Card image cap" />
                            <div class="card-body">
                                <p class="card-title"><strong>{l.Titulo.substring(0, 20)}</strong></p>
                                <p>{l.Autor}</p>
                                <button type="button" onClick={() => redirec(l.Id)} class="btn btn-outline-primary">A partir de R$ {l.Valor}</button>
                            </div>
                        </div>
                    })}
                </div>
            </section>

            <h4 id='titulo'>Favoritos</h4>
            <section id='favoritos'>
                <div class="CardsDescription">
                    {livros?.map(l => {
                        return <div class="card" id="Cards">
                            <img class="card-img-top" src={l.UrlImagem} alt="Card image cap" />
                            <div class="card-body">
                                <p class="card-title"><strong>{l.Titulo.substring(0, 20)}</strong></p>
                                <p>{l.Autor}</p>
                                <button type="button" onClick={() => redirec(l.Id)} class="btn btn-outline-primary">A partir de R$ {l.Valor}</button>
                            </div>
                        </div>
                    })}
                </div>
            </section>
        </>
    )
};

export default Card;