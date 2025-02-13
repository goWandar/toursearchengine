import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";

import { data } from "../data.js";

function Grid() {
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

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Location </th>
            <th>Price </th>
            <th> Description </th>
            <th> Country </th>
          </tr>
        </thead>

        <tbody>
          {data
            .filter((item) => {
              return backendData.toLowerCase() == ""
                ? item
                : item.Location.toLowerCase().includes(backendData);
            })
            .map((item) => (
              <tr key={item.id}>
                <td>{item.Location}</td>
                <td>{item.Description}</td>
                <td>{item.Country}</td>
                <td>{item.Price}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Grid;
