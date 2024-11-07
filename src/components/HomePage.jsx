import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Don't forget to import useSelector

function HomePage() {
  const username = localStorage.getItem('username') || 'Guest';
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn); // Correct variable
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);   // Correct variable

  return (
    <>
      <div className='container-fluid p-4 mb-4' style={{ width: '100%', height: '80vh', backgroundColor: 'white' }}>
        <Row>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column mt-5'>
            <img src="https://airproductionservice.com/wp-content/uploads/2021/05/Login.jpg" width="75%" alt="" />
          </Col>
          <Col md={6} className='d-flex justify-content-center align-items-center flex-column mt-'>
            <div>
              {isAdminLoggedIn && <h3 className='text-warning'>Welcome Admin</h3>} {/* Correct condition */}
              {isUserLoggedIn && <h3 className='text-warning'>Welcome <span color='black'>{username}</span> </h3>} {/* Correct condition */}
              
              <h6>One of the finest charging solutions</h6>
            </div>

            <Link to={'/land'}>
              <button className='btn btn-outline-success my-4'>
                Get Started <i className="fa-solid fa-arrow-right"></i> {/* Correct className */}
              </button>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomePage;
