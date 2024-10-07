import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));
const StaffRegistration = React.lazy(() => import('./pages/StaffRegistration'));
const StaffDetails = React.lazy(() => import('./pages/StaffDetails'));
const EditStaffDetails = React.lazy(() => import('./pages/EditStaffDetails'));
const ProtectedRoute = React.lazy(() => import('./utils/ProtectedRoute'));
const NoPage = React.lazy(() => import('./pages/NoPage'));

function App() {
  return (
    <Suspense fallback={
      <Container>
        <Row className="spinner">
          <Col>
            Loading... 
          </Col>
        </Row>
      </Container>
    }>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/staff-registration" element={<StaffRegistration />} />
          <Route path="/staff/:staffId" element={ <StaffDetails /> } />
          <Route path="/edit-staff/:staffId" element={ <EditStaffDetails /> } />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;