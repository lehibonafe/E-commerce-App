import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Order = () => {
  const [orders, setOrders] = useState([]);

  return (
    <Container>
      <Row>
        <Col>Product Image</Col>
        <Col>Quantity</Col>
        <Col>Date purchased</Col>
        <Col>Total Amount</Col>
      </Row>
      {/* Render order data */}
      {orders.map((order) => (
        <Row key={order.id}>
          <Col>{order.productImage}</Col>
          <Col>{order.quantity}</Col>
          <Col>{order.datePurchased}</Col>
          <Col>{order.totalAmount}</Col>
        </Row>
      ))}
    </Container>
  );
};

export default Order;
