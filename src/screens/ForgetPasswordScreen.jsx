import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const ForgetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [cPass, setCPass] = useState("");

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  console.log(search)
  const sp = new URLSearchParams(search);
  console.log(sp)
  const email = sp.get("email") || "/";
  const token = sp.get("token");
  console.log(email, token)

  const submitHandler = async (e) => {

  };

  return (
    <>
      <FormContainer>
        <h1>Really want to reset your password</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Enter Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              autocomplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={cPass}
              autocomplete="new-password"
              onChange={(e) => setCPass(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <br />
          <Button type="submit" variant="primary">
            Reset the Password
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ForgetPasswordScreen
