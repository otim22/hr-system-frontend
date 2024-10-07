import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { registerAccount } from "../../redux/slices/auth";
import { clearMessage } from "../../redux/slices/message";
import { Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [intialState, setIntialState] = useState({
    name: '',
    email: '',
    password: ''
  });
  const registerSchema = Yup.object().shape({
    name: Yup.string()
                  .required('Your names are required')
                  .max(50, 'Your names must be less than 500 character long'),
    email: Yup.string()
              .required('Email is required')
              .email('must be a valid email'),
    password: Yup.string()
                .required('Password is required')
                .min(4, 'Password must be at least 4 characters long'),
    confirmPassword: Yup.mixed()
                        .required('Confirm your password')
                        .oneOf([Yup.ref('password')], 'Passwords does not match')
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const { hasRegistered } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const  handleInputChange = (event) => {
    setIntialState({ 
        ...intialState, 
        [event.target.name]: event.target.value 
    });
  };

  const  handleSubmitForm = (data) => {
    const {
      name,
      email,
      password
    } = data;
    dispatch(registerAccount({name, email, password }))
      .unwrap()
      .then(() => {
        setIntialState({
          name: "",
          email: "",
          password: ""
        })
        setIsDisabled(true);
        setHasError(false);
        navigate("login");
      })
      .catch(() => {
        if (message) {
          setHasError(true)
        }
      });
  };

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  if (hasRegistered) {
    return <Navigate to="login" />;
  }

  return (
    <>
      <div className="wrapper">
        <Header />

        <Container className="py-5 mt-5">
          <Row className="d-flex justify-items-center">
            <Col className="col-12 col-md-12 col-lg-6 offset-lg-3 py-5 mt-5">
              <div className="border round rounded-2 shadow px-5 py-5">
                <Form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
                  <div className="d-flex justify-content-center pb-3">
                    <h4 className="text-capitalize">Register account</h4>
                  </div>

                  <Row>
                    <Col className="d-flex justify-content-center pb-3">
                      {   
                        hasError === true ? 
                          <p className="fw-bold text-danger">Encountered error.</p> :
                          null
                      }
                    </Col>
                  </Row>

                  <Row className="g-3">
                    <Col>
                      <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="text-capitalize">Full Names</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="name" 
                          value={intialState.name}
                          {...register("name")}
                          onChange={handleInputChange} 
                          placeholder="Full names"
                        />
                        <p className="text-danger">{errors.name?.message}</p>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="text-capitalize">Email</Form.Label>
                    <Form.Control 
                      required
                      name="email" 
                      value={intialState.email}
                      {...register("email")}
                      onChange={handleInputChange} 
                      placeholder="example@domain.xy" 
                    />
                    <p className="text-danger">{errors.email?.message}</p>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="text-capitalize">Password</Form.Label>
                    <Form.Control
                      required 
                      name="password" 
                      value={intialState.password}
                      {...register("password")}
                      onChange={handleInputChange} 
                      placeholder="password" 
                    />
                    <p className="text-danger">{errors.password?.message}</p>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label className="text-capitalize">Confirm password</Form.Label>
                    <Form.Control 
                      name="confirmPassword" 
                      {...register("confirmPassword")}
                      onChange={handleInputChange} 
                      placeholder="confirm password" 
                    />
                    <p className="text-danger">{errors.confirmPassword?.message}</p>
                  </Form.Group>

                  <Row className="d-grid gap-2">
                    <Button variant="primary" className="bg-custom text-capitalize fw-bold mt-4" type="submit" disabled={ isDisabled ?? '' }>
                      Register
                    </Button>
                  </Row>

                  <div className="d-flex justify-content-center pt-3">
                    <div className="pe-2">
                      Already have account?
                    </div>
                    <div>
                      <a href="login" className="d-flex align-items-center link-dark text-decoration-none">
                        <span className="fw-bold"> Login here!</span>
                      </a>
                    </div>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>

        <Footer/>
      </div>
    </>
  );
};

export default Register;