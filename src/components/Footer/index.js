import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <>
      <div className="stick-footer-bottom">
        <Container>
          <Row>
            <Col className="d-flex flex-column flex-sm-row justify-content-center pt-3 border-top">
              <p>{ new Date().getFullYear() } &copy; HR Management System. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;