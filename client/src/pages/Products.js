import React, { useState, useContext } from "react";
import UserContext from "../UserContext";
import ProductCard from "../components/ProductCard";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Filter } from "react-bootstrap-icons";
import Roll from "../images/roll.svg";

const Products = () => {
  const { products } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Extracting unique categories from products
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Function to filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const isInSearch =
      search.toLowerCase() === "" ||
      product.name.toLowerCase().includes(search.toLowerCase());
    const isInCategory =
      selectedCategory === null || product.category === selectedCategory;
    return isInSearch && isInCategory;
  });

  return (
    <Container>
      <div className="d-flex align-items-baseline justify-content-between">
        <Form inline className="mt-5 flex-grow-1">
          <FormControl
            type="text"
            placeholder="Search by name"
            className="mr-sm-2 w-100"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
        <DropdownButton
          variant="transparent"
          title={<Filter size={30} />}
          id="dropdown"
        >
          <Dropdown.Item onClick={() => setSelectedCategory(null)}>
            All
          </Dropdown.Item>
          {categories.map((category) => (
            <Dropdown.Item
              key={category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <Row className="mt-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={6} lg={3}>
              <ProductCard productDetails={product} />
            </Col>
          ))
        ) : (
          <Col className="text-center" sm={12}>
            <img src={Roll} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Products;
