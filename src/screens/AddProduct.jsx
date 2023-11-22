import React, { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddProduct = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [Pic, setPic] = useState("");
  const [desc, setDesc] = useState("");
  const [brnd, setBrnd] = useState("");
  const [catry, setCatgry] = useState("");
  const [prce, setPrce] = useState("");
  const [stk, setStk] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");

  const handleRegSub = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append data to the FormData object
    formData.append("image", Pic);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("brnd", brnd);
    formData.append("catry", catry);
    formData.append("prce", prce);
    formData.append("stk", stk);
    formData.append("rating", rating);
    formData.append("review", review);

    try {
      // Send a POST request using axios
      await axios.post(
        // "http://www.localhost:8080/api/employee",
        "http://localhost:5000/api/addProduct",
        formData
      );

      // Reset form values
      setPic("");
      setName("");
      setDesc("");
      setBrnd("");
      setCatgry("");
      setPrce("");
      setStk("");
      setRating("");
      setReview("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleForm = (e) => {
    const evTarg = e.target;
    const ipName = evTarg.id;
    switch (ipName) {
      case "photo":
        setPic(evTarg.files[0]);
        break;
      case "name":
        setName(evTarg.value);
        break;
      case "desc":
        setDesc(evTarg.value);
        break;
      case "ctgry":
        setCatgry(evTarg.value);
        break;
      case "brnd":
        setBrnd(evTarg.value);
        break;
      case "prce":
        setPrce(evTarg.value);
        break;
      case "stk":
        setStk(evTarg.value);
        break;
      case "rtng":
        setRating(evTarg.value);
        break;
      case "rvw":
        setReview(evTarg.value);
        break;
      default:
        return;
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column"
      style={{ height: "90vh" }}
    >
      <Card>
        <Row className="d-flex justify-content-around">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-around mt-3"
          >
            <Row>
              <Col sm={4} md={4} lg={6}>
                Name of Product :
              </Col>
              <Col lg={6}>
                <input type="text" id='name' value={name} className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              <Col sm={4} md={4} lg={6}>
                Image of Product :
              </Col>
              <Col lg={6}>
                <input type="file" id='photo' className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              <Col sm={4} md={4} lg={6}>
                Description of Product :
              </Col>
              <Col lg={6}>
                <input type="text" id='desc' value={desc} className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              <Col sm={4} md={4} lg={6}>
                Brand of Product :
              </Col>
              <Col lg={6}>
                <input type="text" id='brnd' value={brnd} className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              <Col sm={4} md={4} lg={6}>
                Category of Product :
              </Col>
              <Col lg={6}>
                <input type="text" id='ctgry' value={catry} className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              <Col sm={4} md={4} lg={6}>
                Price of Product :
              </Col>
              <Col lg={6}>
                <input type="text" id='prce' value={prce} className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              <Col sm={4} md={4} lg={6}>
                Number of Product :
              </Col>
              <Col lg={6}>
                <input type="text" id='stk' value={stk} className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3">
            <Row>
              <Col sm={4} md={4} lg={6}>
                Rating of Product :
              </Col>
              <Col lg={6}>
                <input type="text" id='rtng' value={rating} className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
          <Col lg={12} className="d-flex justify-content-around mt-3 mb-3">
            <Row>
              <Col sm={4} md={4} lg={6}>
                Review of Product :
              </Col>
              <Col lg={6}>
                <input type="text" id='rvw' value={review} className="w-100" onChange={(e)=>handleForm(e)} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Button className="mt-4" onClick={handleRegSub}>Submit</Button>
    </div>
  );
};

export default AddProduct;
