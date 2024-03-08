import React, { useContext } from "react";
import { Table } from "react-bootstrap";
import UserContext from "../UserContext";

const Order = () => {
  const { orders } = useContext(UserContext);

  return (
    <Table striped bordered hover>
      <thead className="text-center">
        <tr>
          <th>Product Image</th>
          <th>Status</th>
          <th>Date purchased</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {/* Render order data */}
        {orders.map((order) => (
          <tr key={order._id}>
            <td>
              <img
                style={{ width: "50px" }}
                src={order.productsOrdered[0].imageLink}
              />
            </td>
            <td>{order.status}</td>
            <td>{order.orderedOn}</td>
            <td>$ {order.totalPrice}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Order;
