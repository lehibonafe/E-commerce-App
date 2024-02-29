import React from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";

import Swal from "sweetalert2";

const ProductView = () => {
  const { productId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

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
        console.log(data);

        Swal.fire({
          title: "Item added to cart successful",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#000000",
          cancelButtonColor: "#fb8500",
          confirmButtonText: "Continue shopping",
          cancelButtonText: "Proceed to cart",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/products/");
            window.location.reload();
          }
          if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/cart/all/");
            window.location.reload();
          }
        });
      });
  };

  const buyNow = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#fb8500",
      cancelButtonColor: "#000000",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Item checkout successful",
          text: "Thank you for ordering!",
          icon: "success",
        });
      }
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
          <p className="mt-5">{description}</p>
          <p>Price: ${price}</p>
          <div className="d-flex align-items-center">
            <Button
              className="border-0"
              style={{
                backgroundColor: "transparent",
                color: "#fb8500",
                fontSize: "2rem",
              }}
              onClick={minusQuantity}
            >
              -
            </Button>
            <input
              style={{ height: "38px" }}
              className="text-center border-2"
              value={quantity}
              readOnly
            />
            <Button
              className="border-0"
              style={{
                backgroundColor: "transparent",
                color: "#fb8500",
                fontSize: "2rem",
              }}
              onClick={addQuantity}
            >
              +
            </Button>
          </div>
          <div className="mt-2">
            <Button
              className="border-0"
              style={{ backgroundColor: "#000000" }}
              Button
              onClick={addToCart}
              variant="primary"
            >
              Add To Cart
            </Button>
            <Button
              style={{ backgroundColor: "#fb8500" }}
              onClick={buyNow}
              className="ms-2 border-0"
              variant="danger"
            >
              Buy Now
            </Button>
          </div>
          <div style={{ marginTop: "5rem" }}>
            <NavLink
              to={"/products/"}
              className="text-body"
              style={{ textDecoration: "none", fontWeight: "bold" }}
            >
              <ArrowLeft className="me-2 " />
              Back to shop
            </NavLink>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductView;
