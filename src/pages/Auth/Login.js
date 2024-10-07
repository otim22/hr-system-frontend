import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import 'react-phone-number-input/style.css';
import { login } from "../../redux/slices/auth";
import { clearMessage } from "../../redux/slices/message";

const Login = () => {
  const [intialState, setIntialState] = useState({
    email: "",
    password: "",
  });
  const loginSchema = Yup.object().shape({
    email: Yup.string()
              .required('Email is required')
              .email('must be a valid email'),
    password: Yup.string()
                .required('Password is required'),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmitForm = data => {
    const { email, password } = data;

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        setIntialState({
          email: "",
          password: ""
        })
        setIsDisabled(true);
        setHasError(false);
        navigate("/");
      })
      .catch(() => {
        if (message) {
          setHasError(true)
        }
      });
  }

  const  handleInputChange = (event) => {
    setIntialState({ 
      ...intialState, 
      [event.target.name]: event.target.value 
    });
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="wrapper">
        <Header />
        <Container className="py-5 mt-5">
            <Row className="d-flex justify-items-center">
              <Col className="col-12 col-md-12 col-lg-6 offset-lg-3 py-5 mt-5">
                <Form onSubmit={handleSubmit(handleSubmitForm)} className="border round rounded-2 shadow px-5 py-5">
                  <Row>
                    <Col className="d-flex justify-content-center">
                      <h4 className="text-capitalize">Welcome back!</h4>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="d-flex justify-content-center pb-3">
                      {   
                        errors.email || errors.password || hasError === true ? 
                          <p className="fw-bold text-danger">Email or Password is wrong.</p> :
                          null
                      }
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="text-capitalize">Email</Form.Label>
                    <Form.Control
                      required
                      name="email" 
                      placeholder="example@domain.xy"
                      value={intialState.email}
                      { ...register("email") }
                      onChange={handleInputChange}
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      required
                      name="password" 
                      { ...register("password") }  
                      onChange={handleInputChange} 
                      placeholder="password" 
                    />
                    <p className="text-danger">{ errors.password?.message }</p>
                  </Form.Group>

                  <Row className="d-grid gap-2">
                    <Button variant="primary" className="bg-custom text-capitalize fw-bold mt-4" type="submit" disabled={ isDisabled ?? '' }>
                      Login
                    </Button>
                  </Row>

                  <Row>
                    <Col className="d-flex justify-content-center pt-3">
                      <div className="pe-2">
                        Don't have account?
                      </div>
                      <div>
                        <a href="register" className="d-flex align-items-center link-dark text-decoration-none">
                          <span className="fw-bold"> Register here!</span>
                        </a>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
        </Container>
        <Footer/>
      </div>
    </>
  );
};

export default Login;