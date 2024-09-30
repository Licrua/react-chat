import React from 'react';
import { Image, Col } from 'react-bootstrap';
import signUp from '@assets/icons/pngwing.com (1).png';

const SignUpImage = () => (
  <Col xs={5} lg={4}>
    <Image src={signUp} roundedCircle />
  </Col>
);

export default SignUpImage;
