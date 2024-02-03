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
    <Card key={_id}>
      <Card.Img variant="top" src={imageLink} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Price: ${price}</Card.Text>
        {user.id !== null ? (
          <Link to={`/products/${_id}`}>
            <Button variant="primary">Buy now</Button>
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
