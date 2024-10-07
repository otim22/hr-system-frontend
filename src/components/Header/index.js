import React from 'react';
import { Container, Nav, Navbar, Offcanvas, Button } from 'react-bootstrap';

function Header() {

  return (
    <>
      <Navbar bg="light" className="shadow collapseOnSelect fixed-top" expand="lg">
        <Container className="py-2">
          <Navbar.Brand href="/" className="text-nowrap fw-bold fs-2">HR System</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
          <Navbar.Offcanvas
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className="text-nowrap fw-bold fs-2">
                HR System
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-end cust-nav flex-grow-1 pe-3">
                <div className="col-6 col-lg-4 text-end">
                  <Button href="login" className="rounded bg-custom-out-lined px-3 me-2">Login</Button>
                  <Button href="register" className="rounded bg-custom px-3">Register</Button>
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;