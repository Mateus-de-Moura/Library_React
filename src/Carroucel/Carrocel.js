import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
  return (
    <>   
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./oferta.jpeg"
          alt="First slide"
        />       
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./michel.jpeg"
          alt="Second slide"
        />      
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="itamar.jpeg"
          alt="Third slide"
        />       
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default UncontrolledExample;


