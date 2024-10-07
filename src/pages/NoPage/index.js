import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

function NoPage(args) {

  return (
    <div className="wrapper">
      <Container>
        <Row className="mt-5">
          <Col className="col-12 col-lg-8 offset-lg-2 mt-5 border rounded-3 ps-5 p-4">
            <span className="text-muted">Oops something went wrong!!</span> <br />
            <span className="text-muted"></span> <br />
            <div className="pt-3" >
              <a href="/">Go home</a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NoPage;