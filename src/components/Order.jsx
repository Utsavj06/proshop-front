import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Order = ({ product }) => {
  if (!product) {
    return (
      <Card className="my-3 p-3 rounded">
        <Link>
          <div style={{ height: "200px", width: "100%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)" }} />
        </Link>
        <Card.Body>
          <Link>
            <div style={{ width: "100%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)", height: "2.5em", marginBottom: "10px" }} />
          </Link>

          <div style={{ width: "100%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)", height: "20px" }}></div>
          <div style={{ width: "100%", backgroundImage: "linear-gradient(to right, #cbc0c0, white)", height: "30px", marginTop: "10px" }}></div>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/order/${product._id}`}>
        <img src={product.orderItems[0].image} style={{ height: "200px", width: "100%" }} alt={product.name} />
      </Link>
      <Card.Body>
        <Card.Text as="div">
          <p>{`is Delivered? : ${product.isDelivered}`}</p>
          <p>{`is Paid? : ${product.isPaid}`}</p>
        </Card.Text>
        <Card.Text as="p"><b>{`Total Price: ₹ ${product.totalPrice}`}</b></Card.Text>
      </Card.Body>
      <Link to={`/order/${product._id}`}><Button style={{width:'100%'}}>Proceed</Button></Link>
    </Card>
  );
}

export default Order
