import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const ProductView = () => {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [quantity, setQuantity] = useState(1);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setName(data.products.name);
          setDescription(data.products.description);
          setPrice(data.products.price);
          setCategory(data.products.category);
          setImageLink(data.products.imageLink);
        } else {
          console.error("Empty response from the API");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [productId]);

  const addToCart = () => {
    fetch(`${API_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        productId: productId,
        name: name,
        description: description,
        category: category,
        price: price,
        imageLink: imageLink,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Item successfully added to cart");
        console.log(data);
        window.location.reload();
      });
  };

  const addQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const minusQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      return newQuantity;
    });
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col sm={6}>
          <img src={imageLink} alt={name} style={{ width: "400px" }} />
        </Col>
        <Col sm={6}>
          <h2>{name}</h2>
          <p>{description}</p>
          <p>Price: ${price}</p>
          <div className="d-flex align-items-center">
            <Button onClick={minusQuantity}>-</Button>
            <input className="text-center" value={quantity} readOnly />
            <Button onClick={addQuantity}>+</Button>
          </div>
          <div className="mt-2">
            <Button onClick={addToCart} variant="primary">
              Add To Cart
            </Button>
            <Button className="ms-2" variant="danger">
              Buy Now
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
