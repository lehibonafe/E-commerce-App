import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const ProductView = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setPrice(data.price);
          setRating(data.rating);
          setImageLink(data.image);
        } else {
          console.error("Empty response from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <Container>
      <Row>
        <Col sm={6}>
          <img src={imageLink} alt={title} style={{ width: "400px" }} />
        </Col>
        <Col sm={6}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>Price: ${price}</p>
          <p>Rating: {JSON.stringify(rating)}</p>
          <Button variant="primary">Add to Order Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
