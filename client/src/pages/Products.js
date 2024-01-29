import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import ProductCard from "../components/ProductCard";
import { Container, Row, Col, Form, FormControl } from "react-bootstrap";

const Products = () => {
  const { products } = useContext(UserContext);

  const [search, setSearch] = useState("");

  return (
    <Container>
      <Form inline>
        <FormControl
          type="text"
          placeholder="Search by name"
          className="mr-sm-2"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>
      <Row>
        {products
          .filter((product) => {
            return (
              search.toLowerCase() === "" ||
              product.title.toLowerCase().includes(search.toLowerCase())
            );
          })
          .map((product) => (
            <Col key={product.id} sm={3}>
              <ProductCard key={product.id} productDetails={product} />
            </Col>
          ))}
        {products.length > 0 &&
          products.filter((product) => {
            return (
              search.toLowerCase() === "" ||
              product.title.toLowerCase().includes(search.toLowerCase())
            );
          }).length === 0 && (
            <Col sm={12}>
              <p>No results found.</p>
            </Col>
          )}
      </Row>
    </Container>
  );
};

export default Products;
