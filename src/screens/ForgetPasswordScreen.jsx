import React, { useState } from "react";
import { Button, Form, } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useUpdatePassMutation } from "../slices/usersApiSlice";

const ForgetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [cPass, setCPass] = useState("");

  const navigate = useNavigate();

  const [updatePass] = useUpdatePassMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const email = sp.get("email") || "/";
  const token = sp.get("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await updatePass({
        email: email,
        newPass: password,
        token,
      });
      alert(result.error.data);
      if (result.error.data !== `Token doesn't match`) {
        navigate("/login");
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
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
          {/* <br /> */}
          {password !== cPass && (
            <span className="mb-3 text-danger">Password doesn't match</span>
          )}
          <Button type="submit" variant="primary" disabled={password !== cPass}>
            Reset the Password
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ForgetPasswordScreen;
