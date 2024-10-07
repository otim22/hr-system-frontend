import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/staff`);
        if (!response.ok) {
          throw new Error(`HTTP error: Status ${response.status}`);
        }
        let postsData = await response.json();
        setData(postsData.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForPosts();
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
          <Container className="py-5 mt-5">
            <Row className="d-flex justify-items-center">
              <Col className="col-12 mt-5">
                <div className="d-flex justify-content-between">
                  <div className="mb-3 fs-4 text-capitalize">List of staff management</div>
                  <div><Button href="staff-registration" className="px-3" variant="secondary" size="sm">Register Staff</Button></div>
                </div>

                {loading && (
                  <div className="text-xl font-medium">Loading staff...</div>
                )}
                {error && <div className="text-red-700">{error}</div>}

                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Surname</th>
                      <th>Other Names</th>
                      <th>Date of birth</th>
                      <th>ID Photo</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {data &&
                    data.map(({ id, surname, other_names, date_of_birth, image_src }) => (
                    <tr>
                      <td>{id}</td>
                      <td><a className="text-decoration-none" href={`/staff/${id}`}>{surname}</a></td>
                      <td>{other_names}</td>
                      <td>{date_of_birth}</td>
                      <td>{ image_src }</td>
                      <td><Button className="px-3" href={`/edit-staff/${id}`} variant="outline-primary" size="sm">Edit</Button></td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default Home;