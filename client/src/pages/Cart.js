import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { PlusLg, DashLg, ArrowLeft } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState({ cartItems: [] });
  const [quantity, setQuantity] = useState();

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/cart/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((products) => {
        setCart(products);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    newQuantity = Math.min(Math.max(newQuantity, 1), 10);
    // Find the item in the cart

    const updatedCartItems = cart.cartItems.map((item) => {
      if (item.productId === productId) {
        // Update the quantity and recalculate the subtotal
        const updatedItem = {
          ...item,
          quantity: newQuantity,
          subtotal: newQuantity * item.price,
        };
        return updatedItem;
      }
      return item;
    });

    const totalPrice = updatedCartItems.reduce(
      (acc, item) => acc + item.subtotal,
      0
    );

    // Update the local state with the new quantity and subtotal
    setCart({
      ...cart,
      cartItems: updatedCartItems,
      totalPrice,
    });

    // Update the quantity on the server
    const API_URL = process.env.REACT_APP_API_URL;
    fetch(`${API_URL}/cart/update-cart-quantity`, {
      method: "PATCH", // Assuming you use PATCH for updating quantity
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        productId,
        quantity: newQuantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log("Quantity updated:", data);
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };

  return (
    <Container className="py-5 h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col>
          <Card
            className="card-registration card-registration-2"
            style={{ borderRadius: "15px" }}
          >
            <Card.Body className="p-0">
              <Row className="g-0">
                <Col lg={8}>
                  <div className="p-5">
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                      <h6 className="mb-0 text-muted">
                        {cart.cartItems.length} items
                      </h6>
                    </div>
                    <hr className="my-4" />

                    {cart.cartItems.map((item) => (
                      <Row
                        key={item._id}
                        className="mb-4 d-flex justify-content-between align-items-center"
                      >
                        <Col md={2} lg={2} xl={2}>
                          <Image
                            src={item.imageLink}
                            className="img-fluid rounded-3"
                            alt={item.name}
                          />
                        </Col>
                        <Col md={3} lg={3} xl={3}>
                          <h6 className="text-black mb-0">{item.name}</h6>
                          <h6 className="text-muted mt-4">{item.category}</h6>
                        </Col>
                        <Col md={3} lg={3} xl={2} className="d-flex">
                          <Button
                            variant="link"
                            className="px-2"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                          >
                            <DashLg />
                          </Button>
                          <Form.Control
                            id={`form${item.productId}`}
                            name="quantity"
                            min="1"
                            max="10"
                            value={item.quantity}
                            type="number"
                            className="form-control form-control-sm text-center"
                            readOnly
                            style={{
                              width: "100px",
                            }}
                          />
                          <Button
                            variant="link"
                            className="px-2"
                            onClick={() =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                          >
                            <PlusLg />
                          </Button>
                        </Col>
                        <Col md={3} lg={2} xl={2} className="offset-lg-1">
                          <h6 className="mb-0">$ {item.subtotal}</h6>
                        </Col>
                        <Col md={1} lg={1} xl={1} className="text-end">
                          <Button variant="link" className="text-muted">
                            <i className="fas fa-times"></i>
                          </Button>
                        </Col>
                      </Row>
                    ))}

                    <hr className="my-4" />

                    <div className="pt-5">
                      <h6 className="mb-0">
                        <NavLink to={"/products/"} className="text-body">
                          <ArrowLeft className="me-2" />
                          Back to shop
                        </NavLink>
                      </h6>
                    </div>
                  </div>
                </Col>
                <Col lg={4} className="bg-grey">
                  <div className="p-5">
                    <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                    <hr className="my-4" />

                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="text-uppercase">
                        items {cart.cartItems.length}
                      </h5>
                      <h5>€ {/* Calculate total price */}</h5>
                    </div>

                    <h5 className="text-uppercase mb-3">Shipping</h5>

                    <div className="mb-4 pb-2">
                      <Form.Select className="select">
                        <option value="1">Standard-Delivery- €5.00</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                      </Form.Select>
                    </div>

                    <hr className="my-4" />

                    <div className="d-flex justify-content-between mb-5">
                      <h5 className="text-uppercase">Total price: </h5>
                      <h5>$ {cart.totalPrice}</h5>
                    </div>

                    <Button
                      type="button"
                      variant="dark"
                      block
                      size="lg"
                      data-mdb-ripple-color="dark"
                    >
                      Checkout
                    </Button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
