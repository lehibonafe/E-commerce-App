import React, { useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductCard = ({ productDetails }) => {
  const { user } = useContext(UserContext);

  const { id, title, price, description, category, rating, image } =
    productDetails;

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Price: ${price}</Card.Text>
        <Card.Text>Review: {JSON.stringify(rating.rate)}</Card.Text>

        {user.id !== null ? (
          <Link to={`/products/${id}`}>
            <Button>Add to cart</Button>
          </Link>
        ) : (
          <Link to={`/login/`}>
            <Button variant="primary">Buy now</Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
