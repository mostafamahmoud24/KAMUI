import React from "react";
import "./card.css";
import Card from "react-bootstrap/Card";

export default function CardComponent(props) {
  return (
    <Card className="card-container">
      <Card.Img
        className="card-image"
        variant="top"
        src={props.img}
        bg="warning"
      />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content. Some quick example text to build on the
          card title and make up the bulk of the card's content. Some quick
          example text to build on the card title and make up the bulk of the
          card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
