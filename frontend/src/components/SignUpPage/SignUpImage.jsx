import React from 'react';
import { Image, Col } from 'react-bootstrap';
import signUp from '@assets/icons/pngwing.com (2).png';

const SignUpImage = () => (
  <Col xs={6} lg={5}>
    <Image src={signUp} className="mb-3" />
  </Col>
);

export default SignUpImage;
