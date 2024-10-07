import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import 'react-phone-number-input/style.css';
import { useParams } from 'react-router-dom';
import { registerStaff } from "../../redux/slices/staff";
import { clearMessage } from "../../redux/slices/message";
import staffService from "../../services/staffService";

function EditStaffDetails() {
  const [intialState, setIntialState] = useState({
    surname: "",
    other_names: "",
    date_of_birth: "",
    image_src: "",
  });
  const { staffId } = useParams();
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const getStaffDetails = async () => {
    const data = await staffService.getStaffById(staffId);
		setStaff(data);
	  };
		getStaffDetails();
	}, [staffId]);

  const staffSchema = Yup.object().shape({
    surname: Yup.string()
              .required('Surname is required'),
    other_names: Yup.string()
              .required('Other names is required'),
    date_of_birth: Yup.string()
              .required('Date of birth is required'),
    image_src: Yup.string(),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(staffSchema)
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [hasError, setHasError] = useState(false);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmitForm = data => {
    const { surname, other_names, date_of_birth, image_src } = data;

    dispatch(registerStaff({ surname, other_names, date_of_birth, image_src }))
      .unwrap()
      .then(() => {
        setIntialState({
          surname: "",
          other_names: "",
          date_of_birth: "",
          image_src: ""
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

  return (
    <>
      <div className="wrapper">
        <Header />
        <Container className="py-5 mt-5">
          <Row className="mt-5">
            <Col className="col-12 col-md-12 col-lg-8 offset-lg-2 py-5">
                <div className="d-flex justify-content-between">
                  <div className="mb-3 fs-4 text-capitalize">Edit {staff.surname}</div>
                  <div><Button href="/" className="px-3" variant="secondary" size="sm">Back</Button></div>
                </div>
                <Form onSubmit={handleSubmit(handleSubmitForm)} className="border round rounded-2 px-5 py-5">
                  <Row>
                    <Col className="d-flex justify-content-center pb-3">
                      {   
                        errors.surname || errors.other_names || errors.date_of_birth || hasError === true ? 
                          <p className="fw-bold text-danger">surname or other names or date of birth is wrong.</p> :
                          null
                      }
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="other_names">
                    <Form.Label className="text-capitalize">Surname</Form.Label>
                    <Form.Control
                      required
                      name="surname" 
                      placeholder="Olet"
                      value={intialState.surname}
                      { ...register("surname") }
                      onChange={handleInputChange}
                    />
                    <p className="text-danger">{errors.surname?.message}</p>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="other_names">
                    <Form.Label className="text-capitalize">Other names</Form.Label>
                    <Form.Control
                      required
                      name="other_names" 
                      placeholder="Doe"
                      value={intialState.other_names}
                      { ...register("other_names") }
                      onChange={handleInputChange}
                    />
                    <p className="text-danger">{errors.other_names?.message}</p>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="date_of_birth">
                    <Form.Label className="text-capitalize">Date of birth</Form.Label>
                    <Form.Control
                      required
                      type="date"
                      name="date_of_birth" 
                      placeholder="2000-12-04"
                      value={intialState.date_of_birth}
                      { ...register("date_of_birth") }
                      onChange={handleInputChange}
                    />
                    <p className="text-danger">{errors.date_of_birth?.message}</p>
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="image_src">
                    <Form.Label className="text-capitalize">ID Photo</Form.Label>
                    <Form.Control
                      type="file"
                      name="image_src" 
                      value={intialState.image_src}
                      { ...register("image_src") }
                      onChange={handleInputChange}
                    />
                    <p className="text-danger">{errors.image_src?.message}</p>
                  </Form.Group>

                  <Row className="d-grid gap-2">
                    <Button variant="outline-primary" className="text-capitalize fw-bold mt-4" type="submit" disabled={ isDisabled ?? '' }>
                      Register staff
                    </Button>
                  </Row>
                </Form>
              </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default EditStaffDetails;