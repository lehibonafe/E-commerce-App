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
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const API_URL = process.env.REACT_APP_API_URL;

    fetch(`${API_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        productId: id,
        quantity: quantity,
        productPrice: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Item successfully added to cart");
        console.log(data);
      });
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
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

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    console.log(quantity + 1);
  };

  const minusQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      console.log(newQuantity);
      return newQuantity;
    });
  };

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
          <div>
            <Button onClick={minusQuantity}>-</Button>
            <input className="text-center" value={quantity} />
            <Button onClick={addQuantity}>+</Button>
          </div>
          <Button onClick={addToCart} variant="primary">
            Add To Cart
          </Button>
          <Button variant="danger">Buy Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
