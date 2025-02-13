import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { data } from "../data.js";
import InputGroup from "react-bootstrap/InputGroup";

function Cardview() {
  const [backendData, setBackendData] = useState("");
  return (
    <Container>
    <Form>
    <InputGroup>
      <Form.Control
        onChange={(e) => setBackendData(e.target.value)}
        placeholder="search location"
      ></Form.Control>
    </InputGroup>
  </Form>

    <Row xs={1} md={2} className="g-4">
    {data
    .filter((item) => {
      return backendData.toLowerCase() == ""
      ? item
      : item.Location.toLowerCase().includes(backendData);
}).map((item) =>(
    
      <Col key={item.id}>
        <Card>
          <Card.Img variant="top" src={item.Image} />
          <Card.Body>
            <Card.Title>{item.Location}</Card.Title>
            <Card.Text>
              {item.Description}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
  </Container>
  );
}

export default Cardview;
