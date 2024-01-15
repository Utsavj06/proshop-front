import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../constants";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getGoogleUrl, setGoogleUrl] = useState("");
  const [isDeliveryingAgent, setIsDeliveryingAgent] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    const fun = async () => {
      const resUrl = await axios.get(`${BASE_URL}api/getGoogleAuth`);
      setGoogleUrl(resUrl.data.url);
    };
    fun();

    if (sp.get("token")) {
      const token = sp.get("token") || "";
      const name = sp.get("name") || "";
      const urlEmail = sp.get("email") || "";

      document.cookie = "jwt =" + token;
      dispatch(setCredentials({ token, urlEmail, name }));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password, isDeliveryingAgent }).unwrap();
      document.cookie = "jwt =" + res.token;
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <input type="checkbox" value={isDeliveryingAgent} onClick={()=>setIsDeliveryingAgent(!isDeliveryingAgent)} />
          &nbsp;&nbsp;&nbsp;<label>Delivering Agent?</label>
        <br/>
        <Button disabled={isLoading} type="submit" variant="primary">
          Sign In
        </Button>
        &nbsp;&nbsp;
        <Button
          disabled={isDeliveryingAgent==true  || !getGoogleUrl}
          onClick={() => (window.location.href = getGoogleUrl)}
          variant="primary"
        >
          Login with Google
        </Button>
        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
