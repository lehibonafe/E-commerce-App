import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ productDetails }) => {
  const { user } = useContext(UserContext);

  const { _id, name, price, description, category, rating, imageLink } =
    productDetails;

  return (
    <Card
      className="my-5 py-2"
      key={_id}
      style={{ border: "2px solid #fb8500", height: "400px" }}
    >
      <Card.Img
        style={{ width: "170px", height: "180px" }}
        className="m-auto"
        variant="top"
        src={imageLink}
      />
      <Card.Body style={{ height: "100px", overflow: "hidden" }}>
        <Card.Title
          className="py-5"
          style={{ height: "60px", color: "#fb8500", overflow: "hidden" }}
        >
          {name}
        </Card.Title>
        <Card.Text>Price: ${price}</Card.Text>
        {user.id !== null ? (
          <Link to={`/products/${_id}`} style={{ float: "right" }}>
            <Button className="border-0" style={{ backgroundColor: "#fb8500" }}>
              Add to cart
            </Button>
          </Link>
        ) : (
          <Link to={`/user/login/`}>
            <Button className="border-0" style={{ backgroundColor: "#fb8500" }}>
              Buy now
            </Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
