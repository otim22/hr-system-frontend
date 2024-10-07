import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import staffService from "../../services/staffService";

function StaffDetails() {
  const { staffId } = useParams();
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const getStaffDetails = async () => {
    const data = await staffService.getStaffById(staffId);
		setStaff(data);
	  };
		getStaffDetails();
	}, [staffId]);

  return (
    <>
      <div className="wrapper">
        <Header />
        <Container className="py-5 mt-5">
          <Row className="mt-5">
            <Col className="col-12">
              <Row>
                <Col className="col-12 mb-4">
                  <div className="d-flex mb-3 justify-content-between">
                    <div><Button href="/" className="px-3" variant="outline-secondary" size="sm">Back</Button></div>
                    <div><Button href="staff-registration" className="px-3" variant="primary" size="sm">Edit Staff</Button></div>
                  </div>
                  <Card>
                    <Card.Body>
                      <div><span className="fw-bold">Surname:</span> { staff.surname }</div>
                      <div className="mt-2"><span className="fw-bold">Other Names:</span> { staff.other_names } </div>
                      <div className="mt-2"><span className="fw-bold">Date of Birth:</span> { staff.date_of_birth } </div>
                      <div className="mt-2"><span className="fw-bold">ID Photo:</span> { staff.image_src } </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default StaffDetails;